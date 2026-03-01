// src/components/HeroBanner/HeroBanner.tsx
import React from 'react';
import styles from './HeroBanner.module.scss';
import { Link } from 'react-router-dom';

interface HeroBannerProps {
    title: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
    imageUrl: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ title, subtitle, ctaText, ctaLink, imageUrl }) => {
    return (
        <div className={styles.heroBanner}>
            <img src={imageUrl} alt="Hero Banner" className={styles.bannerImage} />
            <div className={styles.content}>
                <h1>{title}</h1>
                {subtitle && <p>{subtitle}</p>}
                {ctaText && ctaLink && (
                    <Link to={`${ctaLink}?src=all_products`}><p className={styles.ctaButton}>
                        {ctaText}
                    </p></Link>
                )}
            </div>
        </div>
    );
};

export default HeroBanner;