import React from "react";
import styles from './ProductCard.module.scss';
import { formatCurrency } from "../../helpers/currencyFunction";
import { useDispatch, useSelector } from "react-redux";
import QuantityStepper from "../quantityStepper/QuantityStepper";
import { addToWishlist, removeFromWishList } from "../../redux/wishlist/wishlistSlice";
import { IoHeartSharp } from "react-icons/io5";
import { Link } from "react-router-dom";


type Props = {
    product: any
}

const ProductCard: React.FC<Props> = ({ product }) => {

    const dispatch = useDispatch();

    const wishlistItems = useSelector((state: any) => state.wishlist.items);

    const isProductInWishlist = wishlistItems?.includes(product.sku);

    const updateWishlist = () => {
        if (wishlistItems?.includes(product.sku)) {
            dispatch(removeFromWishList(product.sku))
        } else {
            dispatch(addToWishlist(product.sku))
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.imgWrapper}>
                <img src={product?.images?.[0]} alt={product?.title} className={styles.productImg} />
                <IoHeartSharp size={24} className={styles.heart} onClick={updateWishlist} fill={isProductInWishlist ? 'red' : 'grey'} />
            </div>
            <Link to={`/product/${product.sku}`}><p>{product?.title}</p></Link>
            <div className={styles.priceContainer}>
                {product?.price > product?.specialPrice ? <p>{formatCurrency(product?.specialPrice)}</p> : null}
                <p className={product?.price > product?.specialPrice ? styles.strikeThroughPrice : styles.normalPrice}>{formatCurrency(product?.price)}</p>
            </div>
            {product?.discountPercentage > 0 ? <p className={styles.discountPer}>{`${product?.discountPercentage}% off`}</p> : null}
            <QuantityStepper product={product} />
        </div>
    )
}

export default ProductCard