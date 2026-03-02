import { useLocation } from "react-router-dom";
import ProductListHelper from "../../helpers/productList";
import Products from "../../data/products.json";

export const useProductQuery = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const filters = {
        category: searchParams.getAll("category"),
        brand: searchParams.getAll("brand"),
        color: searchParams.getAll("color"),
        price: searchParams.get("price"),
        discount: searchParams.getAll("discount"),
        rating: searchParams.getAll("ratings"),

        /* route dataset selectors */
        tag: searchParams.getAll("tag"),
        search: searchParams.getAll("search"),
        promo: searchParams.getAll("promo")
    };

    const sort = searchParams.get("sort") || "";

    /* STEP 1 — get base dataset from route */
    const baseProducts = ProductListHelper.getBaseProducts(Products, filters);

    /* STEP 2 — apply sidebar filters */
    const refinedProducts = ProductListHelper.applySidebarFilters(
        baseProducts,
        filters
    );

    /* STEP 3 — apply sort */
    const finalProducts = ProductListHelper.applySort(refinedProducts, sort);

    return {
        products: finalProducts,
        numberOfProducts: finalProducts.length
    };
};