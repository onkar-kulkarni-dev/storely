import { useEffect, useState } from "react";
import { CiLock, CiCreditCard1, CiWallet } from "react-icons/ci";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { FaCcAmex } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { paymentMethod } from "../../redux/checkout/checkoutSlice";
import styles from './Payment.module.scss';

const Payment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const checkoutDetails = useSelector((state: any) => state.checkout.paymentMethod);

    const [isCardPayment, setIsCardPayment] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        mode: "onChange",
        reValidateMode: "onChange",
        shouldUnregister: true
    });

    useEffect(() => {
        if (checkoutDetails) {
            const cardSelected = checkoutDetails.type === 'Credit or Debit Card';
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsCardPayment(cardSelected);

            if (cardSelected) {
                reset({
                    cardNumber: checkoutDetails.cardNumber || '',
                    expiryDate: checkoutDetails.expiryDate || '',
                    nameOnCard: checkoutDetails.nameOnCard || '',
                    cvv: checkoutDetails.cvv || ''
                });
            }
        }
    }, [checkoutDetails, reset]);

    const navigateBack = () => navigate('/checkout/delivery');

    const formatCardNumber = (value: string) => {
        const digitsOnly = value.replace(/\D/g, '');
        return digitsOnly.replace(/(.{4})/g, '$1 ').trim();
    };

    const formatExpiryDate = (value: string) => {
        const digits = value.replace(/\D/g, '').slice(0, 4);
        if (digits.length <= 2) return digits.length === 2 ? digits + '/' : digits;
        return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    };

    const onSubmit = (data: any) => {
        dispatch(paymentMethod({
            type: 'Credit or Debit Card',
            cardNumber: data.cardNumber,
            expiryDate: data.expiryDate,
            nameOnCard: data.nameOnCard,
            cvv: data.cvv
        }));
        navigate('/checkout/review');
    };

    const handleContinue = () => {
        if (isCardPayment) {
            handleSubmit(onSubmit)(); // trigger card form validation
        } else {
            dispatch(paymentMethod({
                type: 'Digital Wallet / UPI'
            }));
            navigate('/checkout/review');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Payment Method <span><CiLock /> Secure</span></h2>

            <div className={styles.paymentOptions}>
                <div className={styles.paymentOption}>
                    <label>
                        <input
                            type="radio"
                            checked={isCardPayment}
                            onChange={() => setIsCardPayment(true)}
                        />
                        <div className={styles.cardOption}>
                            <CiCreditCard1 size={24} /> Credit or Debit Card
                            <div className={styles.cards}>
                                <FaCcVisa size={30} color="#1A1F71" />
                                <FaCcMastercard size={30} color="#EB001B" />
                                <FaCcAmex size={30} color="#2E77BC" />
                            </div>
                        </div>
                    </label>
                </div>

                {isCardPayment && (
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer} id="paymentForm">
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
                        {errors.cardNumber && <p className={styles.error}>{errors.cardNumber.message?.toString()}</p>}

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
                                        if (monthNum < 1 || monthNum > 12) return 'Invalid month';
                                        if (year.length !== 2) return 'Invalid year';
                                        return true;
                                    },
                                })}
                                onChange={(e) => {
                                    const formatted = formatExpiryDate(e.target.value);
                                    e.target.value = formatted;
                                    register('expiryDate').onChange(e);
                                }}
                            />
                            {errors.expiryDate && <p className={styles.error}>{errors.expiryDate.message?.toString()}</p>}

                            <label>CVV</label>
                            <input
                                type="password"
                                placeholder="123"
                                className={styles.input}
                                {...register('cvv', {
                                    required: 'CVV is required',
                                    pattern: {
                                        value: /^\d{3,4}$/,
                                        message: 'Please enter a valid CVV (3 or 4 digits)',
                                    },
                                })}
                            />
                            {errors.cvv && <p className={styles.error}>{errors.cvv.message?.toString()}</p>}
                        </div>

                        <label>Name on Card</label>
                        <input
                            type="text"
                            placeholder="Name on Card"
                            className={styles.input}
                            {...register('nameOnCard', { required: 'Name on Card is required' })}
                        />
                        {errors.nameOnCard && <p className={styles.error}>{errors.nameOnCard.message?.toString()}</p>}
                    </form>
                )}

                <div className={styles.paymentOption}>
                    <label>
                        <input
                            type="radio"
                            checked={!isCardPayment}
                            onChange={() => setIsCardPayment(false)}
                        />
                        <CiWallet size={24} /> Digital Wallet / UPI
                    </label>
                </div>
            </div>

            <div className={styles.btnContainer}>
                <button className={styles.returnButton} onClick={navigateBack}>
                    <IoIosArrowBack /> Return to Delivery
                </button>
                <button className={styles.continueButton} type="button" onClick={handleContinue}>
                    Continue to Review
                </button>
            </div>
        </div>
    );
};

export default Payment;