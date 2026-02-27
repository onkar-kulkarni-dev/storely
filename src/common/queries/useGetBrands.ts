import { useMemo } from 'react';
import Products from '../../data/products.json';

export const useGetBrands = () => {
    return useMemo<string[]>(() => {
        return Array.from(
            new Set(
                Products.products
                    .map(product => product.brand as string)
                    .filter(Boolean)
            )
        );
    }, []);
}