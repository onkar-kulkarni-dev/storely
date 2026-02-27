import React, { useEffect, useState } from "react";
import styles from './AuthForm.module.scss';
import { useForm } from "react-hook-form"
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoLogoFacebook } from "react-icons/io5";
import { PASSWORD_CRITERIA } from "../../common/constants/constants";
import { toast } from "react-toastify";

type Props = {
    screen: string
    setForgotPasswordLinkSent?: any
}

const AuthForm: React.FC<Props> = ({ screen, setForgotPasswordLinkSent = () => { } }) => {

    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const [criteria, setCriteria] = useState(PASSWORD_CRITERIA);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = (data: any) => {
        console.log(data)
        if (screen != "forgotPassword") {
            toast.success(screen == "login" ? "Logged in!" : 'Account created successfully!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            setTimeout(() => {
                if (screen == "reg") {
                    navigate('/')
                } else {
                    navigate('/home')
                }
            }, 2000);
        } else {
            setForgotPasswordLinkSent(true)
        }
    }

    const handleNavigation = () => {
        if (screen == "login") {
            navigate('/auth/reg')
        } else {
            navigate('/auth')
        }
    }

    const passwordValue = watch('password')

    useEffect(() => {
        const updatedCriteria = PASSWORD_CRITERIA.map(item => {
            switch (item.id) {
                case 1:
                    return { ...item, status: passwordValue?.length >= 8 };
                case 2:
                    return { ...item, status: /\d/.test(passwordValue) };
                case 3:
                    return { ...item, status: /[^A-Za-z0-9]/.test(passwordValue) };
                case 4:
                    return { ...item, status: /[a-z]/.test(passwordValue) };
                case 5:
                    return { ...item, status: /[A-Z]/.test(passwordValue) };
                default:
                    return item;
            }
        });
        setCriteria(updatedCriteria);
    }, [passwordValue])

    const handleForgotPassword = () => {
        navigate('/auth/forgot-password')
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
                {screen == "reg" && <>
                    <label>Name</label>
                    <input
                        placeholder="John Doe"
                        className={styles.input}
                        {...register("name", {
                            required: true,
                            pattern: /^[A-Za-zÀ-ÖØ-öø-ÿ]+([ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/,
                            minLength: { value: 2, message: "Name must be at least 2 characters" },
                            maxLength: { value: 50, message: "Name cannot exceed 50 characters" }
                        })} />
                    {(errors?.name?.message || errors?.name) && <p className={styles.formError}>Enter a valid name</p>}
                </>}
                <label>Email</label>
                <input
                    placeholder="name@example.com"
                    className={styles.input}
                    {...register("email", {
                        required: true,
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
                    })} />
                {(errors?.email?.message || errors?.email) && <p className={styles.formError}>Enter a valid Email address</p>}
                {screen === "reg" ? (
                    <div className={styles.passwordRow}>
                        <div className={styles.passwordCol}>
                            <label>Password</label>
                            <input
                                placeholder="Enter your password"
                                className={styles.input}
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: true,
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                                })}
                            />
                            <span className={styles.showPassword} onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</span>
                            {(errors?.password?.message || errors?.password) &&
                                <p className={styles.formError}>Enter a valid password</p>}
                        </div>

                        <div className={styles.passwordCol}>
                            <label>Confirm Password</label>
                            <input
                                placeholder="Confirm your password"
                                className={styles.input}
                                type={showConfirmPassword ? "text" : "password"}
                                {...register("confirmPassword", {
                                    required: true,
                                    validate: (value) =>
                                        value === watch("password") || "Passwords do not match"
                                })}
                            />
                            <span className={styles.showPassword} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? 'Hide' : 'Show'}</span>
                            {(errors?.confirmPassword) &&
                                <p className={styles.formError}>Passwords do not match</p>}
                        </div>
                    </div>
                ) : screen == "login" ? (
                    <>
                        <div className={styles.passwordTextContainer}>
                            <label>Password</label>
                            <p className={styles.quickLink} onClick={handleForgotPassword}>Forgot Password</p>
                        </div>
                        <div className={styles.passwordContianer}>
                            <input
                                placeholder="Enter your password"
                                className={styles.input}
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: true,
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                                })}
                            />
                            <span className={styles.showPassword} onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</span>
                        </div>
                        {(errors?.password?.message || errors?.password) &&
                            <p className={styles.formError}>Enter a valid password</p>}
                    </>
                ) : null}

                {screen == "login" && <>
                    <label className={styles.checkboxWrapper}>
                        <input type="checkbox" {...register("rememberMe")} />
                        <span className={styles.customCheckbox}></span>
                        Remember me
                    </label>
                </>}
                {screen == 'reg' && <>
                    <p>Password requirements</p>
                    <div className={styles.passwordCriteriaContainer}>
                        {criteria.map(item => {
                            return <p key={item.id} className={item.status ? styles.passwordSuccessCriteria : styles.passwordCriteria}>{item?.name}</p>
                        })}
                    </div>
                </>}
                <button type="submit" className={styles.btn}>{screen == 'login' ? "Sign In" : screen == "reg" ? "Create Account" : "Send Link"}</button>
            </form >
            {screen == "login" &&
                <>
                    <p className={styles.dividerText}>Or continue with</p>
                    <div className={styles.btnContainer}>
                        <button className={styles.socialLoginBtn}><FcGoogle size={26} /> Google</button>
                        <button className={styles.socialLoginBtn}><IoLogoFacebook size={26} color="#2563EB" /> Facebook</button>
                    </div>
                </>
            }
            {screen == "login" || screen == "reg" ? <>
                <div className={styles.horizontalLine}></div>
                <div className={styles.formFooter}>
                    <p>{screen == 'login' ? "Don't have an account?" : "Already have an account?"} <span className={styles.quickLink} onClick={handleNavigation}>{screen == 'login' ? "Create an account" : "Sign in here"} <FaArrowRight className={styles.rightArrow} /></span></p >
                </div>
            </> : null}
        </div>

    )
}

export default AuthForm