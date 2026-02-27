import React, { useEffect, useRef, useState } from "react";
import ProductCard from "../productCard/ProductCard";
import styles from './ProductGrid.module.scss';

type Props = {
    data: any;
};

const ProductGrid: React.FC<Props> = ({ data }) => {
    const [firstTenProducts, setFirstTenProducts] = useState([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const products = data?.slice(0, 10);
        setFirstTenProducts(products);
    }, [data]);

    const scroll = (direction: "left" | "right") => {
        if (containerRef.current) {
            const { clientWidth } = containerRef.current;
            const scrollAmount = direction === "left" ? -clientWidth / 2 : clientWidth / 2;
            containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <div className={styles.wrapper}>
            <button className={styles.leftBtn} onClick={() => scroll("left")}>‹</button>
            <div className={styles.container} ref={containerRef}>
                {firstTenProducts.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <button className={styles.rightBtn} onClick={() => scroll("right")}>›</button>
        </div>
    );
};

export default ProductGrid;
