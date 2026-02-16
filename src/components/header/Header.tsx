import React from "react";
import styles from './Header.module.scss'

const Header = () => {
    return(
        <div className={styles.container}>
            <img src={require("../../assets/storely.png")} alt={'Storely'} className={styles.logo}/>
        </div>
    )
}

export default Header