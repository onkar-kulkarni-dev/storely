import styles from './NoSearchFound.module.scss';
import NotFound from '../../assets/noProducts.svg?react';
import { useNavigate } from 'react-router-dom';

const NoSearchFound = () => {

    const navigate = useNavigate()

    const handleGoBackHome = () => {
        navigate('/home')
    }

    return (
        <div className={styles.container}>
            <NotFound width={300} height={300} />
            <h2>😕 Product Not Found</h2>
            <p>The product you are looking for does not exist.</p>
            <button onClick={handleGoBackHome}>Go Back Home</button>
        </div>
    )
}

export default NoSearchFound