import { get, ref } from 'firebase/database';
import { db } from './firebase';
import { useEffect, useState } from 'react';
import ProductDialog from './components/product-dialog-form';
import ProductList from './components/product-list';
import { Product } from '.';
import SkeletonCards from './components/skeleton-cards';

export default function App() {
    const [menuItems, setMenuItems] = useState<Record<string, Product>>({});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true);

        const res = await get(ref(db, 'menuItems'));
        setMenuItems(res.val());

        setLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <main className="flex min-h-screen w-screen p-16">
            <div className="container w-5/6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Your Menu</h1>

                    <ProductDialog
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                        onClose={getData}
                    />
                </div>

                {loading ? (
                    <SkeletonCards length={8} />
                ) : !menuItems ? (
                    <p className="p-16 text-center">No menu items.</p>
                ) : (
                    <ProductList products={menuItems} />
                )}
            </div>
        </main>
    );
}
