import Products from '../../data/products.json';

export const useGetBestSellerProducts = () => {
    const data = Products.products.filter((product)=>product?.tags?.includes("bestseller"))
    return data
}