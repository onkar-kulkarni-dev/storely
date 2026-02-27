import styles from "./OrderConfirmation.module.scss";
import { BiRightArrowAlt } from "react-icons/bi";
import { BsBox } from "react-icons/bs";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCheckoutDetails } from "../../redux/checkout/checkoutSlice";

const OrderConfirmation = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const shippingDetailsSelector = useSelector((state: any) => state?.checkout)

    const openOrderHistory = () => {
        // dispatch(clearCheckoutDetails())
    }

    const continueShopping = () => {
        dispatch(clearCheckoutDetails())
        navigate('/home')
    }

    const generateOrderId = () => {
        // eslint-disable-next-line react-hooks/purity
        const randomNumber = Math.random()
        const res = Math.round((randomNumber * 100000000))
        return res
    }

    return (
        <div className={styles.container}>
            <div className={styles.checkMark}><IoIosCheckmarkCircleOutline size={30} color='white' /></div>
            <h2 className={styles.title}>Order Confirmed!</h2>
            <p className={styles.desc}>Thank you for your purchase. We've received your order and are getting it ready to be shipped.</p>
            <div className={styles.orderSummary}>
                <div className={styles.header}>
                    <div>
                        <p className={styles.orderText}>Order Number</p>
                        <p className={styles.orderNumber}>ORD-{generateOrderId()}</p>
                    </div>
                    <div className={styles.iconText}><BsBox /> Preparing for shipment</div>
                </div>
                <div className={styles.horizontalLine}></div>
                <div className={styles.orderInfo}>
                    <div>
                        <p className={styles.firstRow}>Delivery Address</p>
                        <p>{`${shippingDetailsSelector.shippingDetails.firstName} ${shippingDetailsSelector.shippingDetails.lastName}`}</p>
                        <p>{`${shippingDetailsSelector.shippingDetails.apartment}, ${shippingDetailsSelector.shippingDetails.street}`}</p>
                        <p>{`${shippingDetailsSelector.shippingDetails.city}, ${shippingDetailsSelector.shippingDetails.state}, ${shippingDetailsSelector.shippingDetails.zipCode}`}</p>
                    </div>
                    <div>
                        <p className={styles.firstRow}>Estimated Delivery</p>
                        <p style={{ textTransform: 'capitalize' }}>{`${shippingDetailsSelector.deliveryMethod.type} Delivery`}</p>
                        <p className={styles.firstRow}>{`By ${shippingDetailsSelector.deliveryMethod.estimatedDelivery}`}</p>
                    </div>
                </div>
            </div>
            <div className={styles.btnContainer}>
                <button className={styles.firstBtn} onClick={openOrderHistory}>View Order Details</button>
                <button className={styles.secondBtn} onClick={continueShopping}>Continue Shopping <BiRightArrowAlt /></button>
            </div>
        </div>
    )
}

export default OrderConfirmation