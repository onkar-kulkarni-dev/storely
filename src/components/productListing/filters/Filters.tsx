import { useState } from 'react';
import styles from './Filters.module.scss';
import { FILTERS_CONFIG } from '../../../common/constants/constants';

const Filters = () => {
    const [price, setPrice] = useState(500);

    return (
        <div className={styles.container}>
            {FILTERS_CONFIG.map((filter: any) => (
                <div key={filter.label}>
                    <p className={styles.filterType}>{filter.label}</p>

                    {/* ✅ RANGE TYPE SUPPORT ADDED */}
                    {filter.type === "range" ? (
                        <div className={styles.rangeWrapper}>
                            <div className={styles.rangeValues}>
                                <span>₹0</span>
                                <span>₹{price}</span>
                                <span>₹5000</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="5000"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                className={styles.rangeInput}
                            />
                        </div>
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