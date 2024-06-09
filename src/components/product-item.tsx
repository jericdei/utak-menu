import { moneyFormat } from '@/lib/utils';
import { Product } from '..';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';
import useProductStore from '@/stores/product';

interface ProductItemProps {
    product: {
        id: string;
    } & Product;
}

export default function ProductItem({ product }: ProductItemProps) {
    const deleteProduct = useProductStore((state) => state.removeProduct);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{product.name}</CardTitle>
            </CardHeader>

            <CardContent>
                <CardDescription>{product.category}</CardDescription>

                <p className="mt-4 text-right text-lg font-bold">
                    {moneyFormat(product.price)}
                </p>
            </CardContent>

            <CardFooter className="justify-end space-x-2">
                <Button>
                    <i className="ri-pencil-line"></i>
                    <span className="ml-2">Edit</span>
                </Button>

                <Button
                    variant="destructive"
                    onClick={() => deleteProduct(product.id)}
                >
                    <i className="ri-delete-bin-line"></i>
                    <span className="ml-2">Delete</span>
                </Button>
            </CardFooter>
        </Card>
    );
}
