import React from 'react';
import styles from './Cart.module.scss';
import { formatCurrency } from '../../helpers/currencyFunction';
import { LuShieldCheck } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { LiaUndoAltSolid } from "react-icons/lia";
import { useSelector } from 'react-redux';
import { RiDeleteBin5Line } from "react-icons/ri";


const Cart: React.FC = () => {
    const cartItems = useSelector((state: any) => state.cart.items);
    return (
        <div className={styles.cart}>
            <h2>Your Cart</h2>
            {cartItems?.length > 0 ? <>
                <div className={styles.cartDetails}>
                    <div className={styles.cartItems}>
                        <p>{cartItems.length} Items</p>
                        {cartItems?.map((item: any) => {
                            return <div>
                                <div className={styles.cartItem}>
                                    <img src={item.image} alt={item.title} className={styles.cartItemImage} />
                                    <div className={styles.cartItemDetails}>
                                        <p className={styles.cartItemTitle}>{item.title}</p>
                                        <p className={styles.cartItemSeller}>{item.sellerName}</p>
                                        <p className={styles.cartItemPrice}>{formatCurrency(item.price)}</p>
                                    </div>
                                    <button className={styles.deleteBtn}><RiDeleteBin5Line size={20} /></button>
                                </div>
                            </div>
                        })}
                    </div>
                    <div className={styles.orderSummary}>
                        <p className={styles.orderSummaryTitle}>Order Summary</p>
                        <div className={styles.summaryDetails}>
                            <div className={styles.summaryLabels}>
                                <p>{cartItems.length} items</p>
                                <p className={styles.discount}>Discount</p>
                                <p>Shipping</p>
                                <p className={styles.subtotal}>Subtotal</p>
                            </div>
                            <div className={styles.summaryValues}>
                                <p>{formatCurrency(3890)}</p>
                                <p className={styles.discount}> - {formatCurrency(200)}</p>
                                <p>Calculated at checkout</p>
                                <p className={styles.subtotal}>{formatCurrency(3690)}</p>
                            </div>
                        </div>
                        <div className={styles.promoCodeContainer}>
                            <input
                                type="text"
                                placeholder="Enter promo code"
                            />
                            <button>Apply</button>
                        </div>
                        <button className={styles.checkoutButton}>Proceed to Checkout</button>
                        <p className={styles.summaryInfoFooter}><LuShieldCheck size={22} color="green" />Secure payment processing</p>
                        <p className={styles.summaryInfoFooter}><TbTruckDelivery size={22} color="blue" />Free shipping on orders over {formatCurrency(499)}</p>
                        <p className={styles.summaryInfoFooter}><LiaUndoAltSolid size={22} color="orange" />7-day easy return policy</p>
                    </div>
                </div>
            </> : null}
        </div>
    );
};

export default Cart;