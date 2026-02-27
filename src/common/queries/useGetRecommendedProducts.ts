import Products from '../../data/products.json';

export const useGetRecommendedProducts = () => {
    const data = Products.products.filter((product)=>product?.tags?.includes("recommended"))
    return data
}