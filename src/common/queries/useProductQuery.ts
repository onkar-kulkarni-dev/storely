import { useLocation } from "react-router-dom"
import ProductListHelper from "../../helpers/productList";
import Products from '../../data/products.json';

export const useProductQuery = () => {
    const location = useLocation();
    const products = Products ?? {}
    const searchParams = new URLSearchParams(location.search)
    const sortParamValue = searchParams.get('sort')
    const filters = {
        category: searchParams.getAll('category'),
        brand: searchParams.getAll('brand'),
        color: searchParams.getAll('color'),
        price: searchParams.get('price'),
        discount: searchParams.getAll('discount'),
        rating: searchParams.getAll('ratings'),
        tag: searchParams.getAll('tag'),
    }
    const filteredProducts = ProductListHelper.applyMultipleFilters(products.products, filters, sortParamValue ? sortParamValue : '')

    return {
        products: filteredProducts ?? [],
        numberOfProducts: filteredProducts?.length ?? 0,
        filters: []
    }
}