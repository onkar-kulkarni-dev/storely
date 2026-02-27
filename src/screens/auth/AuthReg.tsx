import styles from './Auth.module.scss';
import Logo from '../../assets/storely.png';
import AuthForm from "../../components/auth/AuthForm";

const AuthReg = () => {
    return (
        <div className={styles.container}>
            <img src={Logo} alt="logo" className={styles.logo} />
            <h3 className={styles.welcomeBack}>Create an account</h3>
            <p className={styles.subTitle}>Join thousands of users shopping smarter today</p>
            <div className={styles.formContainer}>
                <AuthForm screen="reg" />
            </div>
        </div>
    )
}

export default AuthReg