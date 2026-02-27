import { useState } from "react";
import styles from './Delivery.module.scss';
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../helpers/currencyFunction";
import { TbTruckDelivery } from "react-icons/tb";
import { BsLightningCharge } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { deliveryMethod } from "../../redux/checkout/checkoutSlice";


const Delivery = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const checkoutDetails = useSelector((state: any) => state.checkout)

    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(checkoutDetails.deliveryMethod.type ? checkoutDetails.deliveryMethod.type : "standard");

    const navigateBack = () => {
        navigate('/checkout');
    }

    const navigateToPayment = () => {
        dispatch(deliveryMethod({
            type: selectedDeliveryMethod,
            estimatedDelivery: getDeliveryEstimate(selectedDeliveryMethod),
            cost: selectedDeliveryMethod == "standard" ? 'Free' : 120
        }))
        navigate('/checkout/payment');
    }

    const getDeliveryEstimate = (type: string) => {
        const currentDate = new Date();
        let estimatedDate;

        if (type === "standard") {
            estimatedDate = new Date(currentDate.setDate(currentDate.getDate() + 5));
        } else if (type === "express") {
            estimatedDate = new Date(currentDate.setDate(currentDate.getDate() + 2));
        }
        const formatted = estimatedDate?.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
        return formatted;
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Delivery Method</h2>
            <div className={styles.deliveryOptions}>
                <div className={styles.deliveryOption}>
                    <div className={styles.deliveryOptionDetails}>
                        <label>
                            <input
                                type="radio"
                                value="standard"
                                checked={selectedDeliveryMethod === "standard"}
                                onChange={(e) => setSelectedDeliveryMethod(e.target.value)}
                            />
                            <TbTruckDelivery /> Standard Delivery
                        </label>
                        <p className={styles.deliveryEstimate}>Estimated delivery: <span>{getDeliveryEstimate('standard')}</span></p>
                    </div>
                    <p>Free</p>
                </div>

                <div className={styles.deliveryOption}>
                    <div className={styles.deliveryOptionDetails}>
                        <label>
                            <input
                                type="radio"
                                value="express"
                                checked={selectedDeliveryMethod === "express"}
                                onChange={(e) => setSelectedDeliveryMethod(e.target.value)}
                            />
                            <BsLightningCharge color="orange" /> Express Delivery
                        </label>
                        <p className={styles.deliveryEstimate}>Estimated delivery: <span>{getDeliveryEstimate('express')}</span></p>
                    </div>
                    <p>{formatCurrency(120)}</p>
                </div>
            </div>
            <div className={styles.btnContainer}>
                <button className={styles.returnButton} onClick={navigateBack}><IoIosArrowBack /> Return to Shipping</button>
                <button className={styles.continueButton} onClick={navigateToPayment}>Continue to Payment</button>
            </div>
        </div>
    )
}

export default Delivery;