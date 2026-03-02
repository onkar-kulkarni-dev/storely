import { useGetNewArrivalProducts } from "../../common/queries/useGetNewArrivalProducts";
import { useGetBestSellerProducts } from "../../common/queries/useGetBestSellerProducts";
import { useGetRecommendedProducts } from "../../common/queries/useGetRecommendedProducts";
import { useGetTrendingProducts } from "../../common/queries/useGetTrendingProducts";
import ProductGrid from "../../components/productGrid/ProductGrid";
import styles from './Home.module.scss'
import { useGetCategories } from "../../common/queries/useGetCategories";
import { useGetBrands } from "../../common/queries/useGetBrands";
import CategoryAndBrands from "../../components/categoryAndBrands/CategoryAndBrands";
import HeroBanner from "../../components/heroBanner/HeroBanner";
import heroBanner from '../../assets/hero-banner.png';
import CouponsSection from "../../components/coupons/CouponsSection";
import Products from '../../data/products.json';
import PromotionsSection from "../../components/promotions/PromotionsSection";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigation = useNavigate()

    const newArrivalProducts = useGetNewArrivalProducts();
    const bestSellerProducts = useGetBestSellerProducts();
    const recommendedProducts = useGetRecommendedProducts();
    const trendingProducts = useGetTrendingProducts();
    const categories = useGetCategories();
    const brands = useGetBrands();

    const heroData = {
        title: "Welcome to Storely!",
        subtitle: "Best Deals on Electronics, Gadgets & Accessories",
        ctaText: "Shop Now",
        ctaLink: "/products",
        imageUrl: "../../assets/hero-banner.png",
    };

    const handleNavigation = (tag: string) => {
        navigation(`/products?tag=${tag}&src=${tag}`)
    }

    const HOME_LAYOUT_GRIDS = [
        { type: 'hero', data: heroData },
        { type: 'category', data: categories },
        { type: 'products', data: newArrivalProducts, title: 'New Arrival' },
        { type: 'products', data: trendingProducts, title: 'Trending' },
        { type: 'coupons', data: Products.coupons },
        { type: 'brands', data: brands },
        { type: 'products', data: bestSellerProducts, title: 'Best Seller' },
        { type: 'products', data: recommendedProducts, title: 'Recommended' },
        { type: 'promotion', data: Products.promotions },
    ]

    return (
        <>
            {HOME_LAYOUT_GRIDS.map((grid: any) => {
                switch (grid.type) {
                    case 'hero':
                        return <HeroBanner
                            title={heroData.title}
                            subtitle={heroData.subtitle}
                            ctaText={heroData.ctaText}
                            ctaLink={heroData.ctaLink}
                            imageUrl={heroBanner}
                        />
                    case 'category':
                        return <>
                            <h2>Shop by Category</h2>
                            <CategoryAndBrands data={categories} type={'category'} />
                        </>
                    case 'products':
                        return <div>
                            <div className={styles.headerContainer}>
                                <h2>{grid.title}</h2>
                                <p className={styles.viewMore} onClick={() => handleNavigation(grid.title)}>View More</p>
                            </div>
                            <ProductGrid data={grid.data} />
                        </div>
                    case 'coupons':
                        return <>
                            <h2>Exclusive Coupons</h2>
                            <CouponsSection coupons={Products.coupons} />
                        </>
                    case 'brands':
                        return <>
                            <h2>Shop by Brands</h2>
                            <CategoryAndBrands data={brands} type={'brand'} />
                        </>
                    case 'promotion':
                        return <>
                            <h2>Current Promotions</h2>
                            <PromotionsSection promotions={Products.promotions} />
                        </>
                    default:
                        return null
                }
            })}
        </>
    )
}

export default Home