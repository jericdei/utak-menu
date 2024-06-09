import { create } from 'zustand';
import { Product } from '..';
import { get, ref, remove, set as firebaseSet } from 'firebase/database';
import { db } from '@/lib/firebase';

export const useProductStore = create<{
    products: ({ id: string } & Product)[];
    getProducts: () => Promise<void>;
    addProduct: (id: string, product: Product) => Promise<void>;
    updateProduct: (id: string, product: Product) => Promise<void>;
    removeProduct: (id: string) => Promise<void>;
}>((set) => ({
    products: [],
    getProducts: async () => {
        const res = await get(ref(db, 'menuItems'));

        if (!res.exists()) {
            return;
        }

        const products = Object.entries(res.val()).map(([key, value]) => ({
            id: key,
            ...(value as Product),
        }));

        set({ products });
    },
    addProduct: async (id: string, product: Product) => {
        await firebaseSet(ref(db, `menuItems/${id}`), product);

        set((state) => ({ products: [...state.products, { id, ...product }] }));
    },
    updateProduct: async (id: string, product: Product) => {
        await firebaseSet(ref(db, `menuItems/${id}`), product);

        set((state) => ({
            products: state.products.map((item) =>
                item.id === id ? { ...product, id } : item,
            ),
        }));
    },
    removeProduct: async (id: string) => {
        await remove(ref(db, `menuItems/${id}`));

        set((state) => ({
            products: state.products.filter((product) => product.id !== id),
        }));
    },
}));

export const useProductFormStore = create<{
    product?: { id: string } & Product;
    setProduct: (product?: { id: string } & Product) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
}>((set) => ({
    product: undefined,
    setProduct: (product?: { id: string } & Product) => {
        if (product === undefined) {
            set({ product: undefined });

            return;
        }

        set({ product });
    },
    open: false,
    setOpen: (open: boolean) => set({ open }),
}));
