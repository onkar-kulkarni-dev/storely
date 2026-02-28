import styles from './ProductListingHeader.module.scss';
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { SORT_BY_OPTION } from '../../../common/constants/constants';
import { useEffect, useRef, useState } from 'react';

const ProductListingHeader = () => {

    const [isViewModal, setIsViewModal] = useState(false);
    const [sortOption, setSortOption] = useState(SORT_BY_OPTION[0].title)
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


    return (
        <div className={styles.container}>
            <p>1-16 of over 5000 results for <span>"apple iphone"</span></p>
            <div ref={modalRef}>
                <button className={styles.btnContainer} onClick={() => setIsViewModal(!isViewModal)}>Sort by: {sortOption} {isViewModal ? <FaAngleUp /> : < FaAngleDown />}</button>
                {isViewModal && <ul className={styles.sortModalContainer}>
                    {SORT_BY_OPTION.map((sort: any) => {
                        return <li key={sort.id} onClick={() => { setSortOption(sort.title); setIsViewModal(false) }}>{sort.title}</li>
                    })}
                </ul>}
            </div>
        </div>
    )
}

export default ProductListingHeader