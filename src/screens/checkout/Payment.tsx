import React from "react";
import { CiLock } from "react-icons/ci";
import styles from './Payment.module.scss';
import { CiCreditCard1 } from "react-icons/ci";
import { CiWallet } from "react-icons/ci";
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { FaCcAmex } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useForm } from "react-hook-form";

const Payment = () => {

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        reValidateMode: "onChange"
    });

    const [isCardPayment, setIsCardPayment] = React.useState(true);

    const navigateBack = () => {
        navigate('/checkout/delivery');
    }

    const onSubmit = () => {
        navigate('/checkout/review');
    }

    const formatCardNumber = (value: string) => {
        const digitsOnly = value.replace(/\D/g, '');
        return digitsOnly.replace(/(.{4})/g, '$1 ').trim();
    };

    const formatExpiryDate = (value: string) => {
        const digits = value.replace(/\D/g, '').slice(0, 4);
        if (digits.length <= 2) {
            return digits.length === 2 ? digits + '/' : digits;
        }
        return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Payment Method <span><CiLock /> Secure</span></h2>
            <div className={styles.paymentOptions}>
                <div className={styles.paymentOption}>
                    <label>
                        <input
                            type="radio"
                            value="standard"
                            checked={isCardPayment}
                            onChange={(e) => setIsCardPayment(true)}
                        />
                        <div className={styles.cardOption}>
                            <CiCreditCard1 size={24} />Credit or Debit Card
                            <div className={styles.cards}>
                                <FaCcVisa size={30} color="#1A1F71" />
                                <FaCcMastercard size={30} color="#EB001B" />
                                <FaCcAmex size={30} color="#2E77BC" />
                            </div>
                        </div>
                    </label>
                </div>
                {isCardPayment && <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer} id="paymentForm">
                    <label>Card Number</label>
                    <input
                        type="text"
                        placeholder="1234 1234 1234 1234"
                        className={styles.input}
                        maxLength={19}
                        {...register('cardNumber', {
                            required: 'Card Number is required',
                            validate: (value) =>
                                value.replace(/\s/g, '').length === 16 ||
                                'Please enter a valid 16-digit card number',
                        })}
                        onChange={(e) => {
                            const formatted = formatCardNumber(e.target.value);
                            e.target.value = formatted;
                            register('cardNumber').onChange(e);
                        }}
                    />
                    {errors.cardNumber && (
                        <p className={styles.error}>{errors.cardNumber.message ? errors.cardNumber.message.toString() : ''}</p>
                    )}
                    <div className={styles.cardDetails}>
                        <label>Expiry Date</label>
                        <input
                            type="text"
                            placeholder="MM/YY"
                            className={styles.input}
                            maxLength={5}
                            {...register('expiryDate', {
                                required: 'Expiry Date is required',
                                validate: (value) => {
                                    const [month, year] = value.split('/');

                                    if (!month || !year) return 'Please enter expiry date';

                                    const monthNum = parseInt(month, 10);
                                    if (monthNum < 1 || monthNum > 12) {
                                        return 'Invalid month';
                                    }

                                    if (year.length !== 2) {
                                        return 'Invalid year';
                                    }

                                    return true;
                                },
                            })}
                            onChange={(e) => {
                                const formatted = formatExpiryDate(e.target.value);
                                e.target.value = formatted;
                                register('expiryDate').onChange(e);
                            }}
                        />
                        {errors.expiryDate && (
                            <p className={styles.error}>{errors.expiryDate.message ? errors.expiryDate.message.toString() : ''}</p>
                        )}
                        <label>CVV</label>
                        <input type="password" placeholder="123" className={styles.input}
                            {...register('cvv', {
                                required: 'CVV is required',
                                pattern: {
                                    value: /^\d{3,4}$/,
                                    message: 'Please enter a valid CVV (3 or 4 digits)',
                                },
                            })}
                        />
                        {errors.cvv && (
                            <p className={styles.error}>{errors.cvv.message ? errors.cvv.message.toString() : ''}</p>
                        )}
                    </div>
                    <label>Name on Card</label>
                    <input type="text" placeholder="Name on Card" className={styles.input}
                        {...register('nameOnCard', {
                            required: 'Name on Card is required',
                        })}
                    />
                    {errors.nameOnCard && (
                        <p className={styles.error}>{errors.nameOnCard.message ? errors.nameOnCard.message.toString() : ''}</p>
                    )}
                </form>}
                <div className={styles.paymentOption}>
                    <label>
                        <input
                            type="radio"
                            value="standard"
                            checked={!isCardPayment}
                            onChange={(e) => setIsCardPayment(false)}
                        />
                        <CiWallet size={24} /> Digital Wallet / UPI
                    </label>
                </div>
            </div>
            <div className={styles.btnContainer}>
                <button className={styles.returnButton} onClick={navigateBack}><IoIosArrowBack /> Return to Delivery</button>
                <button className={styles.continueButton} type="submit" form="paymentForm">Continue to Review</button>
            </div>
        </div>
    )
}

export default Payment;