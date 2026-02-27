import Products from '../../data/products.json';

export const useGetTrendingProducts = () => {
    const data = Products.products.filter((product)=>product?.tags?.includes("trending"))
    return data
}