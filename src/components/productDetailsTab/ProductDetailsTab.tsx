import React, { useState } from "react";
import styles from "./ProductDetailsTab.module.scss";
import { Rating } from "@smastrom/react-rating";

type Props = {
    product: any
}

const ProductDetailsTab: React.FC<Props> = ({ product }) => {
    const TABS = {
        DESCRIPTION: "description",
        SPECIFICATIONS: "specifications",
        BOX: "box",
        REVIEWS: "reviews",
    };
    const [activeTab, setActiveTab] = useState(TABS.DESCRIPTION);

    if (!product) return null;

    return (
        <div className={styles.detailsWrapper}>

            {/* ================= Tabs Header ================= */}
            <div className={styles.tabsHeader}>
                <button
                    className={`${styles.tabBtn} ${activeTab === TABS.DESCRIPTION ? styles.active : ""
                        }`}
                    onClick={() => setActiveTab(TABS.DESCRIPTION)}
                >
                    Description
                </button>

                <button
                    className={`${styles.tabBtn} ${activeTab === TABS.SPECIFICATIONS ? styles.active : ""
                        }`}
                    onClick={() => setActiveTab(TABS.SPECIFICATIONS)}
                >
                    Specifications
                </button>

                <button
                    className={`${styles.tabBtn} ${activeTab === TABS.BOX ? styles.active : ""
                        }`}
                    onClick={() => setActiveTab(TABS.BOX)}
                >
                    What's in the Box
                </button>

                <button
                    className={`${styles.tabBtn} ${activeTab === TABS.REVIEWS ? styles.active : ""
                        }`}
                    onClick={() => setActiveTab(TABS.REVIEWS)}
                >
                    Reviews ({product.ratingCount})
                </button>
            </div>

            {/* ================= Tab Content ================= */}
            <div className={styles.tabContent}>

                {activeTab === TABS.DESCRIPTION && (
                    <div className={styles.section}>
                        <p>{product.description}</p>

                        <div className={styles.meta}>
                            <p><strong>Manufacturer:</strong> {product?.manufacturer?.name} ({product?.manufacturer?.country})</p>
                            <p style={{display: 'flex', gap: '1rem'}}><strong>Seller:</strong> {product?.seller?.name}
                                <Rating
                                    value={product?.seller?.rating?.toFixed(1)}
                                    readOnly
                                    style={{ maxWidth: 80 }}
                                />
                                {product?.seller?.rating?.toFixed(1)}
                            </p>
                        </div>
                    </div>
                )}

                {activeTab === TABS.SPECIFICATIONS && (
                    <div className={styles.specGrid}>
                        <div><strong>Battery:</strong> {product?.batteryLife}</div>
                        <div><strong>Weight:</strong> {product?.weight} g</div>
                        <div>
                            <strong>Dimensions:</strong>{" "}
                            {product.dimensions?.heightCm} × {product?.dimensions?.widthCm} × {product?.dimensions?.depthCm} cm
                        </div>
                        <div><strong>Connectivity:</strong> {product?.connectivity?.join(", ")}</div>
                        <div><strong>Available Colors:</strong> {product?.colorsAvailable?.join(", ")}</div>
                    </div>
                )}

                {activeTab === TABS.BOX && (
                    <ul className={styles.boxList}>
                        {product?.whatsInTheBox?.map((item: any, index: any) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                )}

                {activeTab === TABS.REVIEWS && (
                    <div className={styles.reviewWrapper}>
                        <div className={styles.ratingSummary}>
                            <Rating
                                value={product?.rating?.toFixed(1)}
                                readOnly
                                style={{ maxWidth: 80 }}
                            />
                            {product?.rating?.toFixed(1)} ({product?.ratingCount} Ratings)
                        </div>

                        {product?.reviews?.map((review: any, index: any) => {
                            const rating = Math.round(review?.rating) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
                            return (
                                <div key={index} className={styles.reviewCard}>
                                    <div className={styles.reviewHeader}>
                                        <strong>{review?.reviewerName}</strong>
                                        <span>
                                            <Rating
                                                value={review?.rating?.toFixed(1)}
                                                readOnly
                                                style={{ maxWidth: 80 }}
                                                items={rating}
                                            />
                                            {/* {review?.rating?.toFixed(1)} */}
                                        </span>
                                    </div>
                                    <h4>{review?.title}</h4>
                                    <p>{review?.comment}</p>
                                    <small>{review?.date}</small>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};


export default ProductDetailsTab;