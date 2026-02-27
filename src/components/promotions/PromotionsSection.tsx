// src/components/PromotionsSection/PromotionsSection.tsx
import React from 'react';
import styles from './PromotionsSection.module.scss';

interface Promotion {
    id: string;
    title: string;
    badgeText: string;
    validTill: string;
}

interface PromotionsSectionProps {
    promotions: Promotion[];
}

const PromotionsSection: React.FC<PromotionsSectionProps> = ({ promotions }) => {
    return (
        <div className={styles.promotionsContainer}>
            {promotions.map(promo => (
                <div key={promo.id} className={styles.promoCard}>
                    <div className={styles.badge}>{promo.badgeText}</div>
                    <h3>{promo.title}</h3>
                    <small>Valid till: {promo.validTill}</small>
                </div>
            ))}
        </div>
    );
};

export default PromotionsSection;