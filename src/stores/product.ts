import { create } from 'zustand';
import { Product } from '..';
import { get, ref, remove, set as firebaseSet } from 'firebase/database';
import { db } from '@/firebase';

const useProductStore = create<{
    products: ({ id: string } & Product)[];
    getProducts: () => Promise<void>;
    addProduct: (id: string, product: Product) => Promise<void>;
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
    removeProduct: async (id: string) => {
        await remove(ref(db, `menuItems/${id}`));

        set((state) => ({
            products: state.products.filter((product) => product.id !== id),
        }));
    },
}));

export default useProductStore;
