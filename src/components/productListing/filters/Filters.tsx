import React, { useState } from 'react';
import styles from './Filters.module.scss';
import ProductListHelper from '../../../helpers/productList';
import { formatCurrency } from '../../../helpers/currencyFunction';

type Props = {
    products: any
}

const Filters: React.FC<Props> = ({ products }) => {
    const [price, setPrice] = useState(0);

    const filtersData = ProductListHelper.getDynamicFilters(products)

    return (
        <div className={styles.container}>
            {filtersData.map((filter: any) => (
                <div key={filter.label}>
                    <p className={styles.filterType}>{filter.label}</p>

                    {/* ✅ RANGE TYPE SUPPORT ADDED */}
                    {filter.type === "range" ? (
                        <div className={styles.rangeWrapper}>
                            <div className={styles.rangeValues}>
                                <span>{formatCurrency(filter.options.min)}</span>
                                {price > filter.options.min && <span>{formatCurrency(price)}</span>}
                                <span>{formatCurrency(filter.options.max)}</span>
                            </div>
                            <input
                                type="range"
                                min={filter.options.min}
                                max={filter.options.max}
                                value={price > filter.options.min ? price : filter.options.min}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                className={styles.rangeInput}
                            />
                        </div>
                    ) : filter.key === "color" ? (
                        <form className={styles.colorFormContainer}>
                            {filter.options?.map((option: any) => (
                                <label key={option.label}>
                                    <input type="checkbox" name={filter.label} />

                                    <span
                                        className={`${styles.colorCheckBox} ${option.label.toLowerCase() === "white"
                                            ? styles.darkTick
                                            : styles.lightTick
                                            }`}
                                        style={{ background: option.label }}
                                    ></span>
                                </label>
                            ))}
                        </form>
                    ) : (
                        <form>
                            {filter.options?.map((option: any) => (
                                <label key={option.label} className={styles.checkboxWrapper}>
                                    <input
                                        type={filter.type}
                                        name={filter.label}
                                    />
                                    <span className={filter.type === "radio" ? styles.customRadio : styles.customCheckbox} />
                                    <span>{option.label}</span>
                                </label>
                            ))}
                        </form>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Filters