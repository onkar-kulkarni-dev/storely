import React from "react";
import styles from './ProductCard.module.scss';
import { formatCurrency } from "../../helpers/currencyFunction";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQty, increaseQty } from "../../redux/cart/cartSlice";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";

type Props = {
    product: any
}

const ProductCard: React.FC<Props> = ({ product }) => {

    const dispatch = useDispatch();

    const cartItems = useSelector((state: any) => state.cart.items || []);

    const isSkuInCart = () => {
        return cartItems?.some((item: any) => item.sku === product.sku);
    }

    const getProductQuantity = () => {
        const item = cartItems?.find((item: any) => item.sku === product.sku);
        return item ? item.quantity : 0;
    }

    const addToCartHandler = () => {
        dispatch(addToCart({
            sku: product.sku,
            title: product.title,
            image: product?.images?.[0],
            price: product.price,
            specialPrice: product.specialPrice,
            sellerName: product.seller.name,
            stock: product.stock,
            quantity: 1,
            discountPercentage: product.discountPercentage
        }));
    }

    const incrementQuantityHandler = () => {
        dispatch(increaseQty(product.sku));
    }

    const decrementQuantityHandler = () => {
        dispatch(decreaseQty(product.sku))
    }

    return (
        <div className={styles.container}>
            <div className={styles.imgWrapper}>
                <img src={product?.images?.[0]} alt={product?.title} className={styles.productImg} />
            </div>
            <p>{product?.title}</p>
            <div className={styles.priceContainer}>
                {product?.price > product?.specialPrice ? <p>{formatCurrency(product?.specialPrice)}</p> : null}
                <p className={product?.price > product?.specialPrice ? styles.strikeThroughPrice : styles.normalPrice}>{formatCurrency(product?.price)}</p>
            </div>
            {product?.discountPercentage > 0 ? <p className={styles.discountPer}>{`${product?.discountPercentage}% off`}</p> : null}
            {isSkuInCart() ? <div className={styles.updateBtn}>
                <button className={styles.quantityBtn} onClick={decrementQuantityHandler}><FiMinus size={14} /></button>
                <span className={styles.quantity}>{getProductQuantity()}</span>
                <button className={styles.quantityBtn} onClick={incrementQuantityHandler}><FaPlus size={14} /></button>
            </div> : <button className={styles.btn} onClick={addToCartHandler}><span className={styles.addToCartText}>Add To Cart</span></button>}
        </div>
    )
}

export default ProductCard