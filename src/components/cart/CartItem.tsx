import React from 'react';
import styles from './CartItem.module.scss';
import QuantityStepper from '../quantityStepper/QuantityStepper';
import { formatCurrency } from '../../helpers/currencyFunction';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/cart/cartSlice';
import { RiDeleteBin5Line } from "react-icons/ri";

type Props = {
    item: any
    isCart: boolean
}

const CartItem: React.FC<Props> = ({ item, isCart }) => {

    const dispatch = useDispatch()

    const removeProductFromCart = (sku: string) => {
        dispatch(removeFromCart(sku));
    }

    return (
        <div className={styles.cartItem}>
            <img src={item.image} alt={item.title} className={styles.cartItemImage} />
            <div className={styles.cartItemDetails}>
                <p className={styles.cartItemTitle}>{item.title}</p>
                {isCart ? <>
                    <p className={styles.cartItemSeller}>Sold by- {item.sellerName}</p>
                    <p className={styles.stockStauts} style={{ color: item.stock > 0 ? 'green' : 'red' }}>{item.stock > 0 ? "In Stock" : "Out of Stock"}</p>
                    <div className={styles.quantityStepper}>
                        <QuantityStepper product={item} />
                        <button className={styles.deleteBtn} onClick={() => removeProductFromCart(item.sku)}><RiDeleteBin5Line size={24} color="red" />Remove</button>
                    </div>
                </> : <p className={styles.cartItemSeller}>Qty: {item.quantity}</p>}
            </div>
            <div>
                <p className={styles.cartItemPrice}>{formatCurrency(item.specialPrice * item.quantity)}</p>
                {isCart && <p className={styles.strikeThroughPrice}>{formatCurrency(item.price * item.quantity)}</p>}
            </div>
        </div>
    )
}

export default CartItem;