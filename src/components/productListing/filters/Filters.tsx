import React, { useEffect, useState } from 'react';
import styles from './Filters.module.scss';
import ProductListHelper from '../../../helpers/productList';
import { formatCurrency } from '../../../helpers/currencyFunction';
import { useSearchParams } from 'react-router-dom';

type Props = {
    products: any;
};

const Filters: React.FC<Props> = ({ products }) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const filtersData = ProductListHelper.getDynamicFilters(products);

    /* ---------------- PRICE ---------------- */

    const priceFromUrl = Number(searchParams.get("price") || 0);
    const [price, setPrice] = useState(priceFromUrl || 0);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPrice(priceFromUrl || 0);
    }, [priceFromUrl]);

    /* ---------------- HELPERS ---------------- */

    const isSelected = (key: string, value: string | number) => {
        return searchParams.getAll(key).includes(String(value));
    };

    const updateSearchParamsSafely = (params: URLSearchParams) => {
        const newSearch = params.toString();
        const currentSearch = window.location.search.replace(/^\?/, "");

        if (newSearch !== currentSearch) {
            setSearchParams(params, { replace: true });
        }
    };

    const updateFilter = (key: string, type: string, value: string | number) => {
        const params = new URLSearchParams(searchParams);

        if (type === "checkbox") {
            const existing = params.getAll(key);

            if (existing.includes(String(value))) {
                const updated = existing.filter(v => v !== String(value));
                params.delete(key);
                updated.forEach(v => params.append(key, v));
            } else {
                params.append(key, String(value));
            }
        }

        if (type === "radio") {
            params.set(key, String(value));
        }

        updateSearchParamsSafely(params);
    };

    const updatePrice = (value: number) => {
        setPrice(value);

        const params = new URLSearchParams(searchParams);
        params.set("price", String(value));

        updateSearchParamsSafely(params);
    };

    const clearAllFilters = () => {
        const params = new URLSearchParams(searchParams);

        const src = params.get("src");
        if (!src) return;

        const newParams = new URLSearchParams();

        // always keep src
        newParams.set("src", src);

        // find which param contains src value
        for (const [key, value] of params.entries()) {
            if (key === "src") continue;

            if (value === src) {
                newParams.append(key, value);
            }
        }

        setSearchParams(newParams);
    };

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <p className={styles.filtersTitle}>Filters</p>
                <p className={styles.clearAll} onClick={clearAllFilters}>Clear All</p>
            </div>
            {filtersData.map((filter: any) => (
                <div key={filter.label}>
                    <p className={styles.filterType}>{filter.label}</p>

                    {filter.type === "range" ? (
                        <div className={styles.rangeWrapper}>
                            <div className={styles.rangeValues}>
                                <span>{formatCurrency(filter.options.min)}</span>
                                {price > filter.options.min && (
                                    <span>{formatCurrency(price)}</span>
                                )}
                                <span>{formatCurrency(filter.options.max)}</span>
                            </div>

                            <input
                                type="range"
                                min={filter.options.min}
                                max={filter.options.max}
                                value={price || filter.options.min}
                                onChange={(e) => updatePrice(Number(e.target.value))}
                                className={styles.rangeInput}
                            />
                        </div>
                    ) : filter.key === "color" ? (
                        <form className={styles.colorFormContainer}>
                            {filter.options?.map((option: any) => (
                                <label key={option.value}>
                                    <input
                                        type="checkbox"
                                        checked={isSelected(filter.key, option.value)}
                                        onChange={() =>
                                            updateFilter(filter.key, "checkbox", option.value)
                                        }
                                    />

                                    <span
                                        className={`${styles.colorCheckBox} ${option.label.toLowerCase() === "white"
                                            ? styles.darkTick
                                            : styles.lightTick
                                            }`}
                                        style={{ background: option.label }}
                                    />
                                </label>
                            ))}
                        </form>
                    ) : (
                        <form>
                            {filter.options?.map((option: any) => (
                                <label key={option.value} className={styles.checkboxWrapper}>
                                    <input
                                        type={filter.type}
                                        checked={isSelected(filter.key, option.value)}
                                        onChange={() =>
                                            updateFilter(filter.key, filter.type, option.value)
                                        }
                                    />

                                    <span
                                        className={
                                            filter.type === "radio"
                                                ? styles.customRadio
                                                : styles.customCheckbox
                                        }
                                    />
                                    <span>{option.label}</span>
                                </label>
                            ))}
                        </form>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Filters;