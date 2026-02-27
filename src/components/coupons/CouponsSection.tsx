// src/components/CouponsSection/CouponsSection.tsx
import React from 'react';
import styles from './CouponsSection.module.scss';

interface Coupon {
    id: string;
    code: string;
    type: string;
    value: number;
    description: string;
    validTill: string;
}

interface CouponsSectionProps {
    coupons: Coupon[];
}

const CouponsSection: React.FC<CouponsSectionProps> = ({ coupons }) => {
    return (
        <div className={styles.couponsContainer}>
            {coupons.map(coupon => (
                <div key={coupon.id} className={styles.couponCard}>
                    <div className={styles.badge}>{coupon.type === 'PERCENTAGE' ? `${coupon.value}% OFF` : `₹${coupon.value} OFF`}</div>
                    <h3>{coupon.code}</h3>
                    <p>{coupon.description}</p>
                    <small>Valid till: {coupon.validTill}</small>
                </div>
            ))}
        </div>
    );
};

export default CouponsSection;