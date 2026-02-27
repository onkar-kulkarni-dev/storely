import Products from '../../data/products.json';

export const useGetWishlistProducts = (skus: string[]) => {
    if (!skus || skus.length === 0) return [];

    return skus
        .map((sku) =>
            Products.products.find((product) => product.sku === sku)
        )
        .filter(Boolean);
};