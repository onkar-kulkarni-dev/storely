import styles from './PageNotFound.module.scss';
import  NotFound  from '../../assets/404.svg?react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {

    const navigate = useNavigate()

    const handleGoBackHome = () => {
        navigate('/home')
    }

    return (
        <div className={styles.container}>
            <NotFound width={300} height={300} />
            <h2>Oops! Page Not Found</h2>
            <p>We can’t find this page. Maybe it moved, or maybe it never existed.</p>
            <button onClick={handleGoBackHome}>Go Back Home</button>
        </div>
    )
}

export default PageNotFound