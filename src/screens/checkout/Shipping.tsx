import { useNavigate } from 'react-router-dom';
import styles from './Shipping.module.scss';
import { IoIosArrowBack } from "react-icons/io";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { shippingDetails } from '../../redux/checkout/checkoutSlice';
import { useEffect } from 'react';

const Shipping = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const shippingDetailsSelector = useSelector((state: any) => state?.checkout?.shippingDetails)

    useEffect(() => {
        if (shippingDetailsSelector) {
            reset({
                firstName: shippingDetailsSelector.firstName || "",
                lastName: shippingDetailsSelector.lastName || "",
                street: shippingDetailsSelector.street || "",
                apartment: shippingDetailsSelector.apartment || "",
                city: shippingDetailsSelector.city || "",
                state: shippingDetailsSelector.state || "",
                zip: shippingDetailsSelector.zipCode || "",
                phone: shippingDetailsSelector.phone || "",
            });
        }
    }, [shippingDetailsSelector, reset]);

    const onSubmit = (data: any) => {
        dispatch(shippingDetails({
            firstName: data.firstName,
            lastName: data.lastName,
            street: data.street,
            apartment: data.apartment,
            city: data.city,
            state: data.state,
            zipCode: data.zip,
            phone: data.phone
        }))
        navigate('/checkout/delivery');
    }

    const navigateToCart = () => {
        navigate('/cart');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
            <h2 className={styles.title}>Shipping Information</h2>
            <div className={styles.nameFields}>
                <label className={styles.label}>First Name</label>
                <input
                    type="text"
                    placeholder="First Name"
                    className={styles.input}
                    {...register('firstName', {
                        required: 'First Name is required',
                        pattern: {
                            value: /^[A-Za-z]+$/i,
                            message: 'Please enter a valid First Name',
                        },
                    })}
                />
                {errors.firstName && (
                    <p className={styles.error}>{errors.firstName.message ? errors.firstName.message.toString() : ''}</p>
                )}

                <label className={styles.label}>Last Name</label>
                <input
                    type="text"
                    placeholder="Last Name"
                    className={styles.input}
                    {...register('lastName', {
                        required: 'Last Name is required',
                        pattern: {
                            value: /^[A-Za-z]+$/i,
                            message: 'Please enter a valid Last Name',
                        },
                    })}
                />
                {errors.lastName && (
                    <p className={styles.error}>{errors.lastName.message ? errors.lastName.message.toString() : ''}</p>
                )}
            </div>

            <label className={styles.label}>Street Address</label>
            <input
                type="text"
                placeholder="Street Address"
                className={styles.input}
                {...register('street', {
                    required: 'Street Address is required',
                })}
            />
            {errors.street && (
                <p className={styles.error}>{errors.street.message ? errors.street.message.toString() : ''}</p>
            )}

            <label className={styles.label}>Apartment</label>
            <input
                type="text"
                placeholder="Apartment"
                className={styles.input}
                {...register('apartment', {
                    required: 'Apartment is required',
                    pattern: {
                        value: /^[A-Za-z0-9\s-]+$/i,
                        message: 'Please enter a valid Apartment',
                    },
                })}
            />
            {errors.apartment && (
                <p className={styles.error}>{errors.apartment.message ? errors.apartment.message.toString() : ''}</p>
            )}

            <div className={styles.cityStateZipFields}>
                <label className={styles.label}>City</label>
                <input
                    type="text"
                    placeholder="City"
                    className={styles.input}
                    {...register('city', {
                        required: 'City is required',
                        pattern: {
                            value: /^[A-Za-z\s]+$/i,
                            message: 'Please enter a valid City',
                        },
                    })}
                />
                {errors.city && (
                    <p className={styles.error}>{errors.city.message ? errors.city.message.toString() : ''}</p>
                )}

                <label className={styles.label}>State</label>
                <input
                    type="text"
                    placeholder="State"
                    className={styles.input}
                    {...register('state', {
                        required: 'State is required',
                        pattern: {
                            value: /^[A-Za-z\s]+$/i,
                            message: 'Please enter a valid State',
                        },
                    })}
                />
                {errors.state && (
                    <p className={styles.error}>{errors.state.message ? errors.state.message.toString() : ''}</p>
                )}

                <label className={styles.label}>Zip Code</label>
                <input
                    type="text"
                    placeholder="Zip Code"
                    className={styles.input}
                    {...register('zip', {
                        required: 'Zip Code is required',
                        pattern: {
                            value: /^\d{6}$/,
                            message: 'Please enter a valid 6‑digit Zip Code',
                        },
                    })}
                />
                {errors.zip && (
                    <p className={styles.error}>{errors.zip.message ? errors.zip.message.toString() : ''}</p>
                )}
            </div>

            <label className={styles.label}>Phone Number</label>
            <input
                type="text"
                placeholder="Phone Number"
                className={styles.input}
                {...register('phone', {
                    required: 'Phone Number is required',
                    pattern: {
                        value: /^\d{10}$/,
                        message: 'Please enter a valid 10‑digit Phone Number',
                    },
                })}
            />
            {errors.phone && (
                <p className={styles.error}>{errors.phone.message ? errors.phone.message.toString() : ''}</p>
            )}
            <p>In case we need to contact you about your order</p>
            <div className={styles.btnContainer}>
                <button className={styles.returnButton} onClick={navigateToCart}><IoIosArrowBack /> Return to Cart</button>
                <button type="submit" className={styles.continueButton}>Continue to Delivery</button>
            </div>
        </form>
    )
}

export default Shipping;