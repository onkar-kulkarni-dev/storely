// src/components/PromotionsSection/PromotionsSection.tsx
import React from 'react';
import styles from './PromotionsSection.module.scss';
import { useNavigate } from 'react-router-dom';

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

    const navigation = useNavigate()

    const handleNavigation = (promo: any) => {
        navigation(`/products?promo=${promo.id}`)
    }

    return (
        <div className={styles.promotionsContainer}>
            {promotions.map(promo => (
                <div key={promo.id} className={styles.promoCard} onClick={() => handleNavigation(promo)}>
                    <div className={styles.badge}>{promo.badgeText}</div>
                    <h3>{promo.title}</h3>
                    <small>Valid till: {promo.validTill}</small>
                </div>
            ))}
        </div>
    );
};

export default PromotionsSection;