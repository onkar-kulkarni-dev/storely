import React from "react";
import styles from './ProductCard.module.scss';
import { formatCurrency } from "../../helpers/currencyFunction";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import QuantityStepper from "../quantityStepper/QuantityStepper";

type Props = {
    product: any
}

const ProductCard: React.FC<Props> = ({ product }) => {

    return (
        <div className={styles.container}>
            <div className={styles.imgWrapper}>
                <img src={product?.images?.[0]} alt={product?.title} className={styles.productImg} />
            </div>
            <p>{product?.title}</p>
            <div className={styles.priceContainer}>
                {product?.price > product?.specialPrice ? <p>{formatCurrency(product?.specialPrice)}</p> : null}
                <p className={product?.price > product?.specialPrice ? styles.strikeThroughPrice : styles.normalPrice}>{formatCurrency(product?.price)}</p>
            </div>
            {product?.discountPercentage > 0 ? <p className={styles.discountPer}>{`${product?.discountPercentage}% off`}</p> : null}
            <QuantityStepper product={product} />
        </div>
    )
}

export default ProductCard