import { useProductQuery } from '../../common/queries/useProductQuery';
import ProductCard from '../../components/productCard/ProductCard';
import Filters from '../../components/productListing/filters/Filters';
import ProductListingHeader from '../../components/productListing/header/ProductListingHeader';
import NoSearchFound from '../noSearchFound/NoSearchFound';
import styles from './ProductListingPage.module.scss';
import Products from '../../data/products.json';

const ProductListingPage = () => {

    const { products, numberOfProducts } = useProductQuery()

    return (
        <div>
            <ProductListingHeader numberOfProducts={numberOfProducts} fromProductCount={1} toProductCount={numberOfProducts} />
            <div className={styles.contentContainer}>
                <div className={styles.filterContainer}>
                    <Filters products={Products.products} />
                </div>
                {numberOfProducts > 0 ? <div className={styles.productContainer}>
                    {products?.map((product: any) => {
                        return <ProductCard product={product} />
                    })}
                </div> : <NoSearchFound />}
            </div>
        </div>
    )
}

export default ProductListingPage