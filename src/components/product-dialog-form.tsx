import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from './ui/input';
import MultiInput from './multi-input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './ui/form';
import { ref, set } from 'firebase/database';
import { db } from '@/firebase';

interface ProductDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onClose: () => void;
}

export default function ProductDialog({
    open,
    setOpen,
    onClose,
}: ProductDialogProps) {
    const formSchema = z.object({
        name: z.string().min(1, { message: 'Name is required' }),
        category: z.string().min(1, { message: 'Category is required' }),
        options: z.array(z.string()),
        price: z.number().min(1, { message: 'Price is required' }),
        cost: z.number().min(1, { message: 'Cost is required' }),
        amount: z.number().min(1, { message: 'Amount is required' }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            category: '',
            options: [],
            price: 0,
            cost: 0,
            amount: 0,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const id = Math.random().toString(36).substring(2, 9);

        await set(ref(db, `menuItems/${id}`), values);

        form.reset();

        setOpen(false);
        onClose();
    }

    return (
        <Dialog open={open}>
            <DialogTrigger asChild>
                <Button variant="success" onClick={() => setOpen(true)}>
                    <i className="ri-add-large-fill"></i>
                    <span className="ml-2">Add Product</span>
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Product Form</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="mt-8 space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>

                                    <FormControl>
                                        <Input
                                            placeholder="Category"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>

                                    <FormControl>
                                        <Input
                                            placeholder="Product Name"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="options"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <MultiInput
                                            label="Options"
                                            value={field.value}
                                            onChange={(e) => {
                                                form.setValue('options', e);
                                            }}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center gap-2">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Price</FormLabel>

                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Price"
                                                {...field}
                                                onChange={(value) =>
                                                    field.onChange(
                                                        value.target
                                                            .valueAsNumber ||
                                                            '',
                                                    )
                                                }
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="cost"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Cost</FormLabel>

                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Cost"
                                                {...field}
                                                onChange={(value) =>
                                                    field.onChange(
                                                        value.target
                                                            .valueAsNumber ||
                                                            '',
                                                    )
                                                }
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Amount in Stock</FormLabel>

                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Amount in Stock"
                                                {...field}
                                                onChange={(value) =>
                                                    field.onChange(
                                                        value.target
                                                            .valueAsNumber ||
                                                            '',
                                                    )
                                                }
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end">
                            <Button variant="success" type="submit">
                                Submit
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
