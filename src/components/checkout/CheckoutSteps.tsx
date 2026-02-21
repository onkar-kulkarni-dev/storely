import { useLocation } from "react-router-dom";
import styles from "./CheckoutSteps.module.scss";
import { FaCheck } from "react-icons/fa6";

const steps = [
    { path: "/checkout", label: "Shipping" },
    { path: "/checkout/delivery", label: "Delivery" },
    { path: "/checkout/payment", label: "Payment" },
    { path: "/checkout/review", label: "Review" },
];

function CheckoutSteps() {
    const location = useLocation();

    const currentStepIndex = steps.findIndex(
        (step) => step.path === location.pathname
    );

    return (
        <div className={styles.checkoutContainer}>
            <div className={styles.checkoutLine} />

            {steps.map((step, index) => {
                const isActive = index === currentStepIndex;
                const isCompleted = index < currentStepIndex;

                return (
                    <div key={index} className={styles.stepWrapper}>
                        <div
                            className={`${styles.stepCircle} ${isActive ? styles.active : ""
                                } ${isCompleted ? styles.completed : ""}`}
                        >
                            {isCompleted ? <FaCheck size={14} /> : index + 1}
                        </div>
                        <span className={styles.stepLabel}>{step.label}</span>
                    </div>
                );
            })}
        </div>
    );
}

export default CheckoutSteps;