import { HOME_GRIDS } from "../../common/constants/home-constants";
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

const Home = () => {

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
        ctaLink: "/shop",
        imageUrl: "../../assets/hero-banner.png",
    };

    const productsData = (grid: string) => {
        switch (grid) {
            case 'New Arrival':
                return newArrivalProducts;
            case 'Best Seller':
                return bestSellerProducts;
            case 'Recommended':
                return recommendedProducts;
            case 'Trending':
                return trendingProducts;
            default:
                return []
        }
    }

    return (
        <>
            <HeroBanner
                title={heroData.title}
                subtitle={heroData.subtitle}
                ctaText={heroData.ctaText}
                ctaLink={heroData.ctaLink}
                imageUrl={heroBanner}
            />
            {HOME_GRIDS.map((grid: string) => {
                const data = productsData(grid)
                return (
                    data?.length > 0 && <div key={grid}>
                        <div className={styles.headerContainer}>
                            <h2>{grid}</h2>
                            <p className={styles.viewMore}>View More</p>
                        </div>
                        <ProductGrid data={productsData(grid)} />
                    </div>
                )
            })}
            <h2>Exclusive Coupons</h2>
            <CouponsSection coupons={Products.coupons}/>
            <h2>Shop by Category</h2>
            <CategoryAndBrands data={categories} type={'category'} />
            <h2>Shop by Brands</h2>
            <CategoryAndBrands data={brands} type={'brand'} />
            <h2>Current Promotions</h2>
            <PromotionsSection promotions={Products.promotions}/>
        </>
    )
}

export default Home