import styles from './ProductListingHeader.module.scss';
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { SORT_BY_OPTION } from '../../../common/constants/constants';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
    numberOfProducts: number,
    fromProductCount: number,
    toProductCount: number
}

const ProductListingHeader: React.FC<Props> = ({ numberOfProducts, fromProductCount, toProductCount }) => {

    const location = useLocation();
    const navigate = useNavigate()

    const searchParams = new URLSearchParams(location.search)
    const sortParamValue = searchParams.get('sort')
    const srcParamValue = searchParams.get('src')
    const searchParamValue = searchParams.get('search')
    const filteredSrcParamValue = srcParamValue?.replace('_', " ")
    const itemText = numberOfProducts > 1 ? 'items' : 'item'

    const [isViewModal, setIsViewModal] = useState(false);
    const [sortOption, setSortOption] = useState(sortParamValue ? sortParamValue : SORT_BY_OPTION[0].title)
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                setIsViewModal(false);
            }
        };
        if (isViewModal) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isViewModal]);

    useEffect(() => {
        setSortOption(sortParamValue ?? SORT_BY_OPTION[0].title);
    }, [sortParamValue]);

    const applySort = (sort: any) => {
        setSortOption(sort.title);
        setIsViewModal(false);

        const params = new URLSearchParams(location.search);
        params.set('sort', sort.title);

        navigate(`/products?${params.toString()}`, { replace: true });
    }

    return (
        <div className={styles.container}>
            {searchParamValue ? <p className={styles.searchHeaderTitle}>{`${fromProductCount}-${toProductCount} of over ${numberOfProducts} results for `}<span>{`"${searchParamValue}"`}</span></p> : <p className={styles.headerTitle}>{filteredSrcParamValue} <span>{`${numberOfProducts} ${itemText}`}</span></p>}
            {numberOfProducts > 0 && <div ref={modalRef}>
                <button className={styles.btnContainer} onClick={() => setIsViewModal(!isViewModal)}>Sort by: {sortOption} {isViewModal ? <FaAngleUp /> : < FaAngleDown />}</button>
                {isViewModal && <ul className={styles.sortModalContainer}>
                    {SORT_BY_OPTION.map((sort: any) => {
                        return <li key={sort.id} onClick={() => applySort(sort)}>{sort.title}</li>
                    })}
                </ul>}
            </div>}
        </div>
    )
}

export default ProductListingHeader