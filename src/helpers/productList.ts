import { FILTERS_CONFIG } from "../common/constants/constants";

/* ---------- TYPES ---------- */

type Product = {
    title?: string;
    brand?: string;
    subCategory?: string;
    slug?: string;
    tags?: string[];
    colorsAvailable?: string[];
    price?: number;
    specialPrice?: number;
    rating?: number;
    discountPercentage?: number;
};

type Promotion = {
    id: string;
    applicableSubCategories: string[];
};

type ProductData = {
    products?: Product[];
    promotions?: Promotion[];
};

type FilterOption = {
    label: string;
    value: string | number;
    count?: number;
    disabled?: boolean;
};

/* ---------- HELPER ---------- */

const ProductListHelper = {
    getFilteredProducts(
        data: ProductData = {},
        type: string = "",
        value: string[] = [],
        sort: string = ""
    ): Product[] {
        const products = data?.products ?? [];
        if (!products.length) return [];

        let result: Product[] = [];

        switch (type) {
            case "":
                result = products;
                break;

            case "category": {
                const set = new Set(value.map(v => v.toLowerCase()));
                result = products.filter(
                    item => set.has(item?.subCategory?.toLowerCase() ?? "")
                );
                break;
            }

            case "brand": {
                const set = new Set(value.map(v => v.toLowerCase()));
                result = products.filter(
                    item => set.has(item?.brand?.toLowerCase() ?? "")
                );
                break;
            }

            case "tag": {
                const tagValue =  value?.[0]?.replace(' ', "")?.toLowerCase() ?? "";
                result = products.filter(item =>
                    (item?.tags ?? [])
                        .map(t => t.toLowerCase())
                        .includes(tagValue)
                );
                break;
            }

            case "promo": {
                const promo = (data?.promotions ?? []).find(
                    p => p?.id?.toLowerCase() === value[0]?.toLowerCase()
                );
                const categories = promo?.applicableSubCategories ?? [];
                result = ProductListHelper.getFilteredProducts(
                    data,
                    "category",
                    categories,
                    sort
                );
                break;
            }

            case "search": {
                const input = value[0]?.toLowerCase() ?? "";
                result = products.filter(item => {
                    return (
                        item?.title?.toLowerCase().includes(input) ||
                        item?.brand?.toLowerCase().includes(input) ||
                        item?.subCategory?.toLowerCase().includes(input) ||
                        item?.slug?.replace(/-/g, " ").toLowerCase().includes(input)
                    );
                });
                break;
            }

            default:
                result = products;
        }

        return ProductListHelper.applySort(result, sort);
    },

    applySort(products: Product[], sort: string): Product[] {
        if (!products.length) return [];

        switch (sort) {
            case "":
            case "Featured":
                return products;

            case "Price: Low to High":
                return [...products].sort(
                    (a, b) =>
                        ProductListHelper.getEffectivePrice(a) -
                        ProductListHelper.getEffectivePrice(b)
                );

            case "Price: High to Low":
                return [...products].sort(
                    (a, b) =>
                        ProductListHelper.getEffectivePrice(b) -
                        ProductListHelper.getEffectivePrice(a)
                );

            case "Avg. Customer Review":
                return [...products].sort(
                    (a, b) => (b?.rating ?? 0) - (a?.rating ?? 0)
                );

            case "New Arrivals": {
                const key = "newArrival";
                const withTag = products.filter(p => p?.tags?.includes(key));
                const withoutTag = products.filter(p => !p?.tags?.includes(key));
                return [...withTag, ...withoutTag];
            }

            default:
                return products;
        }
    },

    getEffectivePrice(product: Product): number {
        return product?.specialPrice ?? product?.price ?? 0;
    },

    /* ---------- FILTER OPTIONS ---------- */

    getBrandsFilterOptions(products: Product[]): FilterOption[] {
        const brands = [...new Set(products.map(p => p?.brand).filter(Boolean))];
        return brands.map(brand => ({
            label: brand as string,
            value: brand as string
        }));
    },

    getCategoryFilterOptions(products: Product[]): FilterOption[] {
        const categories = [...new Set(products.map(p => p?.subCategory).filter(Boolean))];
        return categories.map(cat => ({
            label: cat as string,
            value: cat as string
        }));
    },

    getColorsFilterOptions(products: Product[]): FilterOption[] {
        const colors = [
            ...new Set(
                products.flatMap(p =>
                    (p?.colorsAvailable ?? []).map(c => c.toLowerCase())
                )
            )
        ];

        return colors.map(color => ({
            label: color,
            value: color
        }));
    },

    getPriceFilterOptions(products: Product[]) {
        const prices = products.map(p =>
            ProductListHelper.getEffectivePrice(p)
        );

        return {
            min: Math.min(...prices),
            max: Math.max(...prices)
        };
    },

    getDiscountFilterOptions(products: Product[]): FilterOption[] {
        if (!products.length) return [];

        const discountConfig =
            FILTERS_CONFIG.find((f: any) => f.key === "discount")?.options ?? [];

        return discountConfig
            .map((option: any) => {
                const count = products.filter(
                    p => (p?.discountPercentage ?? 0) >= option.value
                ).length;

                return {
                    label: `${option.label}${count ? ` (${count})` : ""}`,
                    value: option.value,
                    count,
                    disabled: count === 0
                };
            })
            .filter(opt => !opt.disabled);
    },

    getDynamicFilters(products: Product[]) {
        return FILTERS_CONFIG.map((filter: any) => {
            switch (filter.key) {
                case "category":
                    return {
                        ...filter,
                        options: ProductListHelper.getCategoryFilterOptions(products)
                    };
                case "brand":
                    return {
                        ...filter,
                        options: ProductListHelper.getBrandsFilterOptions(products)
                    };
                case "price":
                    return {
                        ...filter,
                        options: ProductListHelper.getPriceFilterOptions(products)
                    };
                case "color":
                    return {
                        ...filter,
                        options: ProductListHelper.getColorsFilterOptions(products)
                    };
                case "discount":
                    return {
                        ...filter,
                        options: ProductListHelper.getDiscountFilterOptions(products)
                    };
                default:
                    return filter;
            }
        });
    }
};

export default ProductListHelper;