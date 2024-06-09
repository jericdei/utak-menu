import { Product } from '..';
import ProductItem from './product-item';

interface ProductListProps {
    products: ({ id: string } & Product)[];
}

export default function ProductList({ products }: ProductListProps) {
    return (
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    );
}
