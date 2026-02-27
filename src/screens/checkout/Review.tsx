import React from "react";
import styles from "./Review.module.scss";
import { formatCurrency } from "../../helpers/currencyFunction";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import CartItem from "../../components/cart/CartItem";

const Review = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartItems = useSelector((state: any) => state.cart.items);
    const checkoutDetails = useSelector((state: any) => state.checkout)
    const cardEndingWith = checkoutDetails.paymentMethod.cardNumber ? checkoutDetails.paymentMethod.cardNumber.replace(/\s/g, "").slice(-4) : '';
    const subtotal = cartItems?.reduce((acc: any, item: any) => acc + item.specialPrice * item.quantity, 0);
    const deliveryCharges = checkoutDetails.deliveryMethod.cost > 0 ? checkoutDetails.deliveryMethod.cost : 0;
    const totalTax = (subtotal + deliveryCharges) * (18 / 100)

    const placeOrderHandler = () => {
        dispatch(clearCart())
        navigate('/confirmation')
    }

    return (
        <div className={styles.container}>
            <h2>Review Your Order</h2>
            <p className={styles.desc}>Please check your details before placing the order.</p>
            <div className={styles.card}>
                <h3>Shipping Address</h3>
                <p className={styles.cardTitle}>{`${checkoutDetails.shippingDetails.firstName} ${checkoutDetails.shippingDetails.lastName}`}</p>
                <p className={styles.cardText}>{`${checkoutDetails.shippingDetails.apartment}, ${checkoutDetails.shippingDetails.street}`}</p>
                <p className={styles.cardText}>{`${checkoutDetails.shippingDetails.city}, ${checkoutDetails.shippingDetails.zipCode}`}</p>
                <p className={styles.cardText}>Phone: {`+91 ${checkoutDetails.shippingDetails.phone}`}</p>
            </div>
            <div className={styles.methods}>
                <div className={styles.card}>
                    <h3>Delivery Method</h3>
                    <p className={styles.cardTitle}>{`${checkoutDetails.deliveryMethod.type} Delivery`}</p>
                    <p className={styles.cardText}>{`Estimated arrival: ${checkoutDetails.deliveryMethod.estimatedDelivery}`}</p>
                    <p className={styles.cardText}>{checkoutDetails.deliveryMethod.cost > 0 ? formatCurrency(checkoutDetails.deliveryMethod.cost) : checkoutDetails.deliveryMethod.cost}</p>
                </div>
                <div className={styles.card}>
                    <h3>Payment Method</h3>
                    <p className={styles.cardTitle}>{checkoutDetails.paymentMethod.type}</p>
                    {cardEndingWith ? <p className={styles.cardText}>{`Ending in •••• ${cardEndingWith}`}</p> : null}
                    {checkoutDetails.paymentMethod.expiryDate ? <p className={styles.cardText}>{`Exp: ${checkoutDetails.paymentMethod.expiryDate}`}</p> : null}
                </div>
            </div>
            <div className={styles.card}>
                <h3>Items in Order</h3>
                {cartItems?.map((item: any) => {
                    return <div className={styles.itemContainer}>
                        <CartItem item={item} isCart={false} />
                    </div>
                })}
            </div>
            <div className={styles.card}>
                <h3>Order Summary</h3>
                <div className={styles.summary}>
                    <div className={styles.summaryLabels}>
                        <p>{`Items (${cartItems?.length})`}:</p>
                        <p>Shipping:</p>
                        <p>Estimated Tax (18%):</p>
                        <p className={styles.summaryTotal}>Total</p>
                    </div>
                    <div className={styles.summaryValues}>
                        <p>{formatCurrency(subtotal)}</p>
                        <p>{deliveryCharges > 0 ? formatCurrency(deliveryCharges) : 'Free'}</p>
                        <p>{formatCurrency(totalTax)}</p>
                        <p className={styles.summaryTotal}>{formatCurrency(subtotal + deliveryCharges + totalTax)}</p>
                    </div>
                </div>
                <button className={styles.placeOrderBtn} onClick={placeOrderHandler}>Place Order</button>
                <p className={styles.terms}>By placing your order, you agree to Storely's Terms of Service and Privacy Policy.</p>
            </div>
        </div>
    )
}

export default Review;