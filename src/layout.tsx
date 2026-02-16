import React from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import styles from './layout.module.scss'

type Props = {
    children: any
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <div>
            <Header />
            <div className={styles.content}>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout