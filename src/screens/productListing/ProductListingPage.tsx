import { useProductQuery } from '../../common/queries/useProductQuery';
import ProductCard from '../../components/productCard/ProductCard';
import Filters from '../../components/productListing/filters/Filters';
import ProductListingHeader from '../../components/productListing/header/ProductListingHeader';
import NoSearchFound from '../noSearchFound/NoSearchFound';
import styles from './ProductListingPage.module.scss';

const ProductListingPage = () => {

    const { products, numberOfProducts, filters } = useProductQuery()

    return (
        <div>
            <ProductListingHeader numberOfProducts={numberOfProducts} fromProductCount={1} toProductCount={numberOfProducts}/>
            {numberOfProducts > 0 ? <div className={styles.contentContainer}>
                <div className={styles.filterContainer}>
                    <Filters products={products}/>
                </div>
                <div className={styles.productContainer}>
                    {products?.map((product: any) => {
                        return <ProductCard product={product} />
                    })}
                </div>
            </div> :
                <NoSearchFound />
            }

        </div>
    )
}

export default ProductListingPage