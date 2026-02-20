import React from 'react';
import styles from './QuantityStepper.module.scss';
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decreaseQty, increaseQty } from '../../redux/cart/cartSlice';

type Props = {
    product: any
}

const QuantityStepper: React.FC<Props> = ({ product }) => {

    const dispatch = useDispatch();

    const cartItems = useSelector((state: any) => state.cart.items || []);

    const isSkuInCart = () => {
        return cartItems?.some((item: any) => item.sku === product.sku);
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

    const getProductQuantity = () => {
        const item = cartItems?.find((item: any) => item.sku === product.sku);
        return item ? item.quantity : 0;
    }

    return (
        isSkuInCart() ? < div className={styles.updateBtn} >
            <button className={styles.quantityBtn} onClick={decrementQuantityHandler}><FiMinus size={14} /></button>
            <span className={styles.quantity}>{getProductQuantity()}</span>
            <button className={styles.quantityBtn} onClick={incrementQuantityHandler}><FaPlus size={14} /></button>
        </div > : <button className={styles.btn} onClick={addToCartHandler}><span className={styles.addToCartText}>Add To Cart</span></button>
    )
}

export default QuantityStepper;
