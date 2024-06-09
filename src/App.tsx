import { get, ref, set } from 'firebase/database';
import { db } from './firebase';
import { useEffect, useState } from 'react';
import ProductDialog from './components/product-dialog';

export default function App() {
    const [menuItems, setMenuItems] = useState({});

    const getData = async () => {
        const res = await get(ref(db, 'menuItems'));

        setMenuItems(res.val());
    };

    useEffect(() => {
        getData();
    }, []);

    async function saveMenuItems() {
        const data = {
            foo: 'bar',
        };

        const id = Math.random().toString(36).substring(2, 9);

        await set(ref(db, `menuItems/${id}`), data);

        await getData();
    }

    return (
        <main className="flex min-h-screen w-screen p-16">
            <div className="container w-5/6">
                <div className="flex justify-end">
                    <ProductDialog />
                </div>

                <div className="mt-16">
                    {menuItems ? (
                        JSON.stringify(menuItems)
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </div>
        </main>
    );
}
