import { FILTERS_CONFIG } from "../common/constants/constants"

const ProductListHelper = {
    getFilteredProducts(products: any = {}, type: string = '', value: any = [], sort: string = '') {
        let result: any = []
        if (products?.products?.length > 0) {
            switch (type) {
                case '':
                    result = products?.products
                    break
                case 'category':
                    const categoryValueSet = new Set(value?.map((v: string) => v.toLowerCase()));
                    const categoryFilteredProducts = products?.products?.filter((item: any) =>
                        categoryValueSet?.has(item?.subCategory?.toLowerCase())
                    );
                    result = categoryFilteredProducts
                    break
                case 'brand':
                    const brandValueSet = new Set(value?.map((v: string) => v.toLowerCase()));
                    const brandFilteredProducts = products?.products?.filter((item: any) =>
                        brandValueSet?.has(item?.brand?.toLowerCase())
                    );
                    result = brandFilteredProducts
                    break
                case 'tag':
                    const tagValue = value?.[0]?.replace(' ', "")?.toLowerCase()
                    const tagFilteredProducts = products?.products?.filter((item: any) =>
                        item?.tags?.map(t => t.toLowerCase())?.includes(tagValue)
                    );
                    result = tagFilteredProducts
                    break
                case 'promo':
                    const getApplicableCategories = products?.promotions?.filter((promo: any) => promo?.id?.toLowerCase() == value?.[0]?.toLowerCase())
                    const promoFilteredProducts = ProductListHelper.getFilteredProducts(products, 'category', getApplicableCategories?.[0]?.applicableSubCategories, sort)
                    result = promoFilteredProducts
                    break
                case 'search':
                    const inputValue = value?.[0]?.toLowerCase()
                    const searchFilteredProducts = products?.products?.filter((item: any) => {
                        return (
                            item?.title?.toLowerCase()?.includes(inputValue) ||
                            item?.brand?.toLowerCase()?.includes(inputValue) ||
                            item?.subCategory?.toLowerCase()?.includes(inputValue) ||
                            item?.slug?.replace(/-/g, " ")?.toLowerCase()?.includes(inputValue)
                        )
                    })
                    result = searchFilteredProducts
                    break
                default:
                    return result
            }
            const sortedProducts = ProductListHelper.applySort(result, sort)
            return sortedProducts
        }
        return result
    },
    applySort(products: any[], sort: string) {
        if (!products) return [];

        switch (sort) {
            case '':
            case 'Featured':
                return products;
            case 'Price: Low to High':
                return [...products].sort(
                    (a, b) => ProductListHelper.getEffectivePrice(a) - ProductListHelper.getEffectivePrice(b)
                );
            case 'Price: High to Low':
                return [...products].sort(
                    (a, b) => ProductListHelper.getEffectivePrice(b) - ProductListHelper.getEffectivePrice(a)
                );
            case 'Avg. Customer Review':
                return [...products].sort((a, b) => (b?.rating ?? 0) - (a?.rating ?? 0));
            case 'New Arrivals':
                const key = "newArrival";
                const productsWithNewArrival = products.filter((p) => p?.tags?.includes(key));
                const productsWithoutNewArrival = products.filter((p) => !p?.tags?.includes(key));
                return [...productsWithNewArrival, ...productsWithoutNewArrival];
            default:
                return products;
        }
    },
    getEffectivePrice(product: any) {
        return product?.specialPrice ?? product?.price
    },
    getBrandsFilterOptions(products: any) {
        const brands = [...new Set(products.map((item: any) => item.brand))]
        const brandsOptions = brands.map((brand: string) => {
            return {
                label: brand,
                type: brand
            }
        })
        return brandsOptions
    },
    getCategoryFilterOptions(products: any) {
        const categories = [...new Set(products.map((item: any) => item.subCategory))];
        const categoryOptions = categories.map((category: string) => {
            return {
                label: category,
                type: category
            }
        })
        return categoryOptions
    },
    getColorsFilterOptions(products: any) {
        const colors = [
            ...new Set(
                products.flatMap((item: any) =>
                    item.colorsAvailable.map((color: any) => color.toLowerCase())
                )
            )
        ];
        const colorOption = colors.map((color: string) => {
            return {
                label: color,
                value: color
            }
        })
        return colorOption
    },
    getPriceFilterOptions(products: any) {
        const prices = [...new Set(products.map((item: any) => ProductListHelper.getEffectivePrice(item)))]
        const min = Math.min(...prices)
        const max = Math.max(...prices)
        return {
            min,
            max
        }
    },
    getDiscountFilterOptions(products: any) {
        if (!products?.length) return [];
        const discountConfig = FILTERS_CONFIG.find(
            (f: any) => f.key === "discount"
        )?.options ?? [];
        const discountOptions = discountConfig.map((option: any) => {
            const count = products.filter(
                (product: any) =>
                    (product?.discountPercentage ?? 0) >= option.value
            ).length;
            return {
                label: `${option.label}${count ? ` (${count})` : ""}`,
                value: option.value,
                count,
                disabled: count === 0
            };
        });
        // hide options that don't exist (Amazon style)
        return discountOptions.filter((opt: any) => !opt.disabled);
    },
    getDynamicFilters(products: any) {
        return FILTERS_CONFIG.map((filter: any) => {
            if (filter.key == 'category') {
                return {
                    ...filter,
                    options: ProductListHelper.getCategoryFilterOptions(products)
                }
            }
            if (filter.key == 'brand') {
                return {
                    ...filter,
                    options: ProductListHelper.getBrandsFilterOptions(products)
                }
            }
            if (filter.key == 'price') {
                return {
                    ...filter,
                    options: ProductListHelper.getPriceFilterOptions(products)
                }
            }
            if (filter.key == 'color') {
                return {
                    ...filter,
                    options: ProductListHelper.getColorsFilterOptions(products)
                }
            }
            if (filter.key == 'discount') {
                return {
                    ...filter,
                    options: ProductListHelper.getDiscountFilterOptions(products)
                }
            }
            return filter
        })
    }
}

export default ProductListHelper