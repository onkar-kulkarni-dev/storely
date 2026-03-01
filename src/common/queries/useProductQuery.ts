import { useLocation } from "react-router-dom"
import ProductListHelper from "../../helpers/productList";
import Products from '../../data/products.json';

export const useProductQuery = () => {
    const location = useLocation();
    const products = Products ?? {}
    const searchParams = new URLSearchParams(location.search)
    const categoryParamValue = searchParams.get('category')
    const brandParamValue = searchParams.get('brand')
    const promoParamValue = searchParams.get('promo')
    const tagParamValue = searchParams.get('tag')
    const searchParamValue = searchParams.get('search')
    const sortParamValue = searchParams.get('sort')
    let navType: string = ''
    let navValue: any = null
    if (categoryParamValue) {
        navType = 'category'
        navValue = categoryParamValue
    } else if (brandParamValue) {
        navType = 'brand'
        navValue = brandParamValue
    } else if (promoParamValue) {
        navType = 'promo'
        navValue = promoParamValue
    } else if (tagParamValue) {
        navType = 'tag'
        navValue = tagParamValue
    } else if (searchParamValue) {
        navType = 'search'
        navValue = searchParamValue
    }
    let filters = {
        category: '',
        brand: '',
        promo: '',
        search: '',
        tag: ''
    }
    const filteredProducts = ProductListHelper.getFilteredProducts(products, navType, navValue ? [navValue] : [], sortParamValue ? sortParamValue : '')
    return {
        products: filteredProducts ?? [],
        numberOfProducts: filteredProducts?.length ?? 0,
        filters: []
    }
}