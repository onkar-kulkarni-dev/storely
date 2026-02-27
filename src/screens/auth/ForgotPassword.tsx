import { useState } from "react";
import styles from './Auth.module.scss';
import AuthForm from "../../components/auth/AuthForm";
import Logo from '../../assets/storely.png';
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

    const navigate = useNavigate()

    const [forgotPasswordLinkSent, setForgotPasswordLinkSent] = useState(false);

    const handleBackToSignIn = () => {
        navigate('/')
    }

    return (
        <div className={styles.container}>
            <img src={Logo} alt="logo" className={styles.logo} />
            <div className={styles.formContainer}>
                {forgotPasswordLinkSent ? <>
                    <h3 className={styles.welcomeBack} style={{ textAlign: 'center' }}>Check your mail</h3>
                    <p className={styles.subTitle} style={{ textAlign: 'center' }}>We've sent password reset instructions to your email address.</p>
                    <button className={styles.backToSignInBtn} onClick={handleBackToSignIn}>Back to sign in</button>
                </> :
                    <AuthForm screen="forgotPassword" setForgotPasswordLinkSent={setForgotPasswordLinkSent} />
                }
            </div>
        </div>
    )
}

export default ForgotPassword