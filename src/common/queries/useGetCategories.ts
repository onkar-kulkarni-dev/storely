import { useMemo } from 'react';
import Products from '../../data/products.json';

export const useGetCategories = () => {
    return useMemo<string[]>(() => {
        return Array.from(
            new Set(
                Products.products
                    .map(product => product.subCategory as string)
                    .filter(Boolean)
            )
        );
    }, []);
}