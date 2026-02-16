import React, { useState } from "react";
import styles from './AuthForm.module.scss';
import { useForm, SubmitHandler } from "react-hook-form"
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoLogoFacebook } from "react-icons/io5";

type Props = {
    screen: string
}

const AuthForm: React.FC<Props> = ({ screen }) => {

    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data: any) => {
        navigate('/home')
    }

    const handleRegisteration = () => {
        navigate('/auth/reg')
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
                <label>Email</label>
                <input
                    placeholder="name@example.com"
                    className={styles.input}
                    {...register("email", {
                        required: true,
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
                    })} />
                {(errors?.email?.message || errors?.email) && <p className={styles.formError}>Enter a valid Email address</p>}
                <label>Password</label>
                <input
                    placeholder="Enter your password"
                    className={styles.input}
                    type="password"
                    {...register("password", {
                        required: true,
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                    })} />
                {(errors?.password?.message || errors?.password) && <p className={styles.formError}>Enter a valid password</p>}
                <label className={styles.checkboxWrapper}>
                    <input type="checkbox" {...register("rememberMe")} />
                    <span className={styles.customCheckbox}></span>
                    Remember me
                </label>
                <button type="submit" className={styles.btn}>Sign In</button>
            </form >
            <p className={styles.dividerText}>Or continue with</p>
            <div className={styles.btnContainer}>
                <button className={styles.socialLoginBtn}><FcGoogle size={26} /> Google</button>
                <button className={styles.socialLoginBtn}><IoLogoFacebook size={26} color="#2563EB" /> Facebook</button>
            </div>
            <div className={styles.horizontalLine}></div>
            <div className={styles.formFooter}>
                <p>Don't have an account? <span className={styles.quickLink} onClick={handleRegisteration}>Create an account <FaArrowRight className={styles.rightArrow} /></span></p >
            </div>
        </div>

    )
}

export default AuthForm