import { useSelector } from 'react-redux';
import styles from './Wishlist.module.scss';
import { useGetWishlistProducts } from '../../common/queries/useGetWishlistProducts';
import  NoWishlist  from '../../assets/noWishlist.svg';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/productCard/ProductCard';

const Wishlist = () => {

    const navigate = useNavigate();

    const wishlistItems = useSelector((state: any) => state.wishlist.items)

    const wishListProductsData = useGetWishlistProducts(wishlistItems)

    const exploreProductsHandler = () => {
        navigate('/home')
    }

    return (
        <div>
            <h2 className={styles.title}>Wishlist {wishListProductsData.length > 0 ? `(${wishListProductsData.length})` : ''}</h2>
            <div>
                {wishListProductsData?.length > 0 ? <div className={styles.wishlistGrid}>
                    {wishListProductsData?.map((product: any, index: number) => {
                        return <div key={index}>
                            <ProductCard product={product} />
                        </div>
                    })}

                </div> : <div className={styles.emptyWishlist}>
                    <NoWishlist width={300} height={300} />
                    <h2>💔 Your Wishlist is Empty</h2>
                    <p>Looks like you haven’t added anything yet. Start exploring and save your favorite products here.</p>
                    <button onClick={exploreProductsHandler}>Explore Products</button>
                </div>}
            </div>
        </div>
    )
}

export default Wishlist