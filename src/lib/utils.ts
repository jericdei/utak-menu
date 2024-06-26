import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function moneyFormat(
    amount: number,
    locale = 'en-PH',
    currency = 'PHP',
) {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(amount);
}

export function removePropertyFromObject<T, K extends keyof T>(
    obj: T,
    prop: K,
): Omit<T, K> {
    const { [prop]: _, ...rest } = obj;

    return rest;
}
