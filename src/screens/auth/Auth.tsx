import styles from './Auth.module.scss';
import AuthForm from "../../components/auth/AuthForm";
import Logo from '../../assets/storely.png';
import { ToastContainer } from "react-toastify";

const Auth = () => {
    return (
        <div className={styles.container}>
            <img src={Logo} alt="logo" className={styles.logo} />
            <h3 className={styles.welcomeBack}>Welcome back</h3>
            <p className={styles.subTitle}>Enter your credentials to access your account</p>
            <div className={styles.formContainer}>
                <AuthForm screen="login" />
            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}

export default Auth