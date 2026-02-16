import React from "react";
import { HOME_GRIDS } from "../common/constants/home-constants";
import { useGetNewArrivalProducts } from "../common/queries/useGetNewArrivalProducts";
import { useGetBestSellerProducts } from "../common/queries/useGetBestSellerProducts";
import { useGetRecommendedProducts } from "../common/queries/useGetRecommendedProducts";
import { useGetTrendingProducts } from "../common/queries/useGetTrendingProducts";
import ProductGrid from "../components/productGrid/ProductGrid";
import styles from './Home.module.scss'

const Home = () => {

    const newArrivalProducts = useGetNewArrivalProducts();
    const bestSellerProducts = useGetBestSellerProducts();
    const recommendedProducts = useGetRecommendedProducts();
    const trendingProducts = useGetTrendingProducts();

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
            {HOME_GRIDS.map((grid: string) => {
                return (
                    <div key={grid}>
                        <div className={styles.headerContainer}>
                            <h2>{grid}</h2>
                            <p className={styles.viewMore}>View More</p>
                        </div>
                        <ProductGrid data={productsData(grid)} />
                    </div>
                )
            })}
        </>
    )
}

export default Home