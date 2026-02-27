import React from 'react';
import styles from './Cart.module.scss';
import { formatCurrency } from '../../helpers/currencyFunction';
import { LuShieldCheck } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { LiaUndoAltSolid } from "react-icons/lia";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from '../../components/cart/CartItem';
import CartEmpty from '../../assets/cartEmpty.svg';


const Cart: React.FC = () => {

    const navigate = useNavigate();

    const cartItems = useSelector((state: any) => state.cart.items);

    const totalPrice = cartItems?.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0);
    const totalSpecialPrice = cartItems?.reduce((acc: any, item: any) => acc + item.specialPrice * item.quantity, 0);
    const totalDiscount = totalPrice - totalSpecialPrice;
    const subtotal = cartItems?.reduce((acc: any, item: any) => acc + item.specialPrice * item.quantity, 0);

    const proceedToCheckoutHandler = () => {
        navigate('/checkout');
    }

    const handleShopNow = () => {
        navigate('/home')
    }

    return (
        <div className={styles.cart}>
            <h2>Your Cart</h2>
            {cartItems?.length > 0 ? <>
                <div className={styles.cartDetails}>
                    <div className={styles.cartItems}>
                        <p>{cartItems.length} Items</p>
                        {cartItems?.map((item: any) => {
                            return <div>
                                <CartItem item={item} isCart={true} />
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
                                <p>{formatCurrency(totalPrice)}</p>
                                <p className={styles.discount}> - {formatCurrency(totalDiscount)}</p>
                                <p>Calculated at checkout</p>
                                <p className={styles.subtotal}>{formatCurrency(subtotal)}</p>
                            </div>
                        </div>
                        <div className={styles.promoCodeContainer}>
                            <input
                                type="text"
                                placeholder="Enter promo code"
                            />
                            <button>Apply</button>
                        </div>
                        <button className={styles.checkoutButton} onClick={proceedToCheckoutHandler}>Proceed to Checkout</button>
                        <p className={styles.summaryInfoFooter}><LuShieldCheck size={22} color="green" />Secure payment processing</p>
                        <p className={styles.summaryInfoFooter}><TbTruckDelivery size={22} color="blue" />Free shipping on orders over {formatCurrency(499)}</p>
                        <p className={styles.summaryInfoFooter}><LiaUndoAltSolid size={22} color="orange" />7-day easy return policy</p>
                    </div>
                </div>
            </> : <>
                <div className={styles.emptyCartCntainer}>
                    <CartEmpty width={300} height={300} />
                    <h2>Your Storely Cart is empty</h2>
                    <p>Looks like you haven't added anything to your cart yet. Check out today's best deals!</p>
                    <button onClick={handleShopNow}>Shop Now</button>
                </div>
            </>}
        </div>
    );
};

export default Cart;