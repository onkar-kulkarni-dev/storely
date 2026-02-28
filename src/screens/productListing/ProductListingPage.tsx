import { useGetNewArrivalProducts } from '../../common/queries/useGetNewArrivalProducts';
import ProductCard from '../../components/productCard/ProductCard';
import Filters from '../../components/productListing/filters/Filters';
import ProductListingHeader from '../../components/productListing/header/ProductListingHeader';
import styles from './ProductListingPage.module.scss';

const ProductListingPage = () => {

    const newArrivalProducts = useGetNewArrivalProducts();

    return (
        <div>
            <ProductListingHeader />
            <div className={styles.contentContainer}>
                <div className={styles.filterContainer}>
                    <Filters />
                </div>
                <div className={styles.productContainer}>
                    {newArrivalProducts.map((product: any) => {
                        return <ProductCard product={product} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProductListingPage