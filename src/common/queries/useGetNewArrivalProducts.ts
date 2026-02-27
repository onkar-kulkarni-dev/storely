import Products from '../../data/products.json';

export const useGetNewArrivalProducts = () => {
    const newArrivalProducts = Products.products.filter((product)=>product?.tags?.includes("newArrival"))
    return newArrivalProducts
}