import Products from '../../data/products.json';

export const useGetProductDetails = (sku: string) => {
    const data = Products.products.filter((product)=>sku == product.sku)
    return data
}