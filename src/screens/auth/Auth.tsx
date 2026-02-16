import React from "react";
import styles from './Auth.module.scss';
import AuthForm from "./AuthForm";
import Logo from '../../assets/storely.png';

type Props = {

}

const Auth: React.FC<Props> = ({ }) => {
    return (
        <div className={styles.container}>
            <img src={Logo} alt="logo" className={styles.logo}/>
            <h3 className={styles.welcomeBack}>Welcome back</h3>
            <p className={styles.subTitle}>Enter your credentials to access your account</p>
            <div className={styles.formContainer}>
                <AuthForm screen="login" />
            </div>
        </div>
    )
}

export default Auth