// src/components/HeroBanner/HeroBanner.tsx
import React from 'react';
import styles from './HeroBanner.module.scss';

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
                    <a href={ctaLink} className={styles.ctaButton}>
                        {ctaText}
                    </a>
                )}
            </div>
        </div>
    );
};

export default HeroBanner;