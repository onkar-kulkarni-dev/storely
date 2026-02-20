import React, { useEffect, useState } from "react";
import styles from './Header.module.scss'
import { FaShoppingCart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
// import { CiLocationOn } from "react-icons/ci";
import Products from '../../data/products.json';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {

    const navigation = useNavigate()

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any>([]);

    const cartItems = useSelector((state: any) => state.cart.items);

    useEffect(() => {
        if (query.length > 3) {
            const filtered = Products.products.filter((product: any) =>
                product.title.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filtered);
        } else {
            setResults([]);
        }
    }, [query]);

    const openCart = () => {
        navigation('/cart')
    }

    const openHome = () => {
        navigation('/home')
    }

    return (
        <div className={styles.container}>
            <div className={styles.leftSection}>
                <img src={require("../../assets/storely.png")} alt={'Storely'} className={styles.logo} onClick={openHome} />
                {/* <p className={styles.location}><CiLocationOn size={24} color="white" className={styles.icon} />411021</p> */}
            </div>
            <div style={{ position: 'relative' }}>
                <LuSearch className={styles.searchIcon} size={20} />
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Search Storely.in"
                    onChange={(e) => setQuery(e.target.value)}
                />
                {results?.length > 0 && <div className={styles.autoSuggestionsContainer}>
                    {results.map((item: any) => (
                        <p key={item.id}>{item.title}</p>
                    ))}
                </div>}
            </div>
            <div className={styles.rightSection}>
                <FaRegUser size={24} color="white" className={styles.icon} />
                <FaRegHeart size={24} color="white" className={styles.icon} />
                <div>
                    <FaShoppingCart size={24} color="white" className={styles.icon} onClick={openCart}/>
                    <div className={styles.badge}>{cartItems?.length}</div>
                </div>
            </div>
        </div>
    )
}

export default Header