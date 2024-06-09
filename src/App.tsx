import { useEffect, useState } from 'react';
import ProductDialog from './components/product-dialog-form';
import ProductList from './components/product-list';
import SkeletonCards from './components/skeleton-cards';
import useProductStore from './stores/product';

export default function App() {
    const products = useProductStore((state) => state.products);
    const getProducts = useProductStore((state) => state.getProducts);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true);

        await getProducts();

        setLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <main className="flex min-h-screen w-screen p-16">
            <div className="container w-5/6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Your Products</h1>

                    <ProductDialog
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                        onClose={getData}
                    />
                </div>

                {loading ? (
                    <SkeletonCards length={8} />
                ) : products.length === 0 ? (
                    <div className="p-64">
                        <p className="text-center">
                            You don't have any products yet.{' '}
                            <span
                                className="cursor-pointer underline"
                                onClick={() => setDialogOpen(true)}
                            >
                                Add a new one!
                            </span>
                        </p>
                    </div>
                ) : (
                    <ProductList products={products} />
                )}
            </div>
        </main>
    );
}
