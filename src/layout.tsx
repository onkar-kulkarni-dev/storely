import React, { ReactNode } from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import styles from './layout.module.scss';
import { useLocation } from 'react-router-dom';
import { NO_LAYOUT_PAGES } from "./common/constants/constants";

type Props = {
    children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {

    const location = useLocation();

    const isHideLayout = NO_LAYOUT_PAGES.includes(location.pathname)

    return (
        <div>
            {!isHideLayout && <Header />}
            <div className={styles.content}>
                {children}
            </div>
            {!isHideLayout && <Footer />}
        </div>
    )
}

export default Layout