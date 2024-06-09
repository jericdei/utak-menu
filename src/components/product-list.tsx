import { Product } from '..';
import ProductItem from './product-item';

interface ProductListProps {
    products: {
        [key: string]: Product;
    };
}

export default function ProductList({ products }: ProductListProps) {
    return (
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Object.entries(products).map(([id, product]) => (
                <ProductItem key={id} product={product} />
            ))}
        </div>
    );
}
