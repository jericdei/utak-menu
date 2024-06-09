import { useEffect, useState } from 'react';
import ProductDialog from './components/product-dialog-form';
import ProductList from './components/product-list';
import SkeletonCards from './components/skeleton-cards';
import { useProductFormStore, useProductStore } from './stores/product';
import { Button } from './components/ui/button';

export default function App() {
    const { products, getProducts } = useProductStore((state) => state);
    const { setOpen, setProduct, product } = useProductFormStore(
        (state) => state,
    );
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
            <ProductDialog onClose={getData} />

            <div className="container w-5/6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Your Products</h1>

                    <Button
                        variant="success"
                        onClick={() => {
                            setProduct(undefined);
                            setOpen(true);
                        }}
                    >
                        <i className="ri-add-large-fill"></i>
                        <span className="ml-2">Add Product</span>
                    </Button>
                </div>

                {loading ? (
                    <SkeletonCards length={8} />
                ) : products.length === 0 ? (
                    <div className="p-64">
                        <p className="text-center">
                            You don't have any products yet.{' '}
                            <span
                                className="cursor-pointer underline"
                                onClick={() => {
                                    setProduct(undefined);

                                    setOpen(true);
                                }}
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
