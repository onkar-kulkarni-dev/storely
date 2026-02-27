import styles from './Footer.module.scss';
import { FOOTER_DATA } from "../../common/constants/constants";

const Footer = () => {

    return (
        <footer className={styles.container}>
            {FOOTER_DATA.map((item: any, index: number) => {
                return <div key={index} className={styles.footerColumn}>
                    {index == 0 ? <h1>{item.title}</h1> : <h4>{item.title}</h4>}
                    {item.desc && <p>{item.desc}</p>}
                    {item.items &&
                        <ul>
                            {item.items.map((link: string, idx: number) => {
                                return <li key={idx}>{link}</li>

                            })}
                        </ul>}
                </div>
            })}
            <div className={styles.footerBottom}>
                <p>© 2026 Storely. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer