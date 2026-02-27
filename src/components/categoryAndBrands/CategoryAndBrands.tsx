import React, { useRef } from 'react';
import styles from './CategoryAndBrands.module.scss';
import { FaMobileScreenButton } from "react-icons/fa6";
import { LiaLaptopSolid } from "react-icons/lia";
import { ImTablet } from "react-icons/im";
import { SiYoutubegaming } from "react-icons/si";
import { IoMdHeadset } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import { BsSmartwatch } from "react-icons/bs";
import { FaApple } from "react-icons/fa";
import { SiSamsung } from "react-icons/si";
import { SiXiaomi } from "react-icons/si";
import { SiOneplus } from "react-icons/si";
import { SiDell } from "react-icons/si";
import { SiHp } from "react-icons/si";
import { SiLenovo } from "react-icons/si";
import { SiSony } from "react-icons/si";
import { FaSailboat } from "react-icons/fa6";
import { SiOppo } from "react-icons/si";
import { SiNikon } from "react-icons/si";
import { BiLogoProductHunt } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";


type Props = {
    data: any
    type: string
}

const CategoryAndBrands: React.FC<Props> = ({ data, type }) => {

    const containerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (containerRef.current) {
            const { clientWidth } = containerRef.current;
            const scrollAmount = direction === "left" ? -clientWidth / 2 : clientWidth / 2;
            containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    }

    const getIcons = (item: string) => {
        if (type == "category") {
            return getCategoryIcon(item)
        } else {
            return getBrandIcon(item)
        }
    }

    const getCategoryIcon = (category: string) => {
        switch (category?.toLowerCase()) {
            case 'camera':
                return <FaCamera size={32} />;
            case 'headsets':
                return <IoMdHeadset size={32} />;
            case 'laptops':
                return <LiaLaptopSolid size={32} />;
            case 'mobiles':
                return <FaMobileScreenButton size={32} />;
            case 'gaming':
                return <SiYoutubegaming size={32} />;
            case 'tablets':
                return <ImTablet size={32} />;
            case 'smartwatch':
                return <BsSmartwatch size={32} />;
            default:
                return null;
        }
    }

    const getBrandIcon = (brand: string) => {
        switch (brand?.toLowerCase()) {
            case 'apple':
                return <FaApple size={32} fill="A2AAAD"/>;
            case 'samsung':
                return <SiSamsung size={32} fill="#1428A0"/>;
            case 'xiaomi':
                return <SiXiaomi size={32} fill='orange'/>;
            case 'oneplus':
                return <SiOneplus size={32} fill="red"/>;
            case 'google':
                return <FcGoogle size={32} />;
            case 'dell':
                return <SiDell size={32} fill='blue'/>;
            case 'hp':
                return <SiHp size={32} fill='#0096D6'/>;
            case 'lenovo':
                return <SiLenovo size={32} fill="red"/>;
            case 'sony':
                return <SiSony size={32} />;
            case 'amazfit':
                return <BsSmartwatch size={32} />;
            case 'boat':
                return <FaSailboat size={32} fill="#E50914"/>;
            case 'oppo':
                return <SiOppo size={32} fill="green"/>;
            case 'canon':
                return <FaCamera size={32} fill="#BC0024"/>;
            case 'realme':
                return <FaMobileScreenButton size={32} fill="#FFD700"/>;
            case 'nikon':
                return <SiNikon size={32} fill="#FFD600"/>;
            case 'gopro':
                return <BiLogoProductHunt size={32} fill="#00B0F0"/>;
            default:
                return null;
        }
    }

    return (
        <div className={styles.wrapper}>
            <button className={styles.leftBtn} onClick={() => scroll("left")}>‹</button>
            <div className={styles.container} ref={containerRef}>
                {data.map((item: string) => (
                    <div key={item} style={{ textAlign: 'center' }}>
                        <div className={styles.iconContainer} onClick={()=>{}}>
                            {getIcons(item)}
                        </div>
                        <p style={{ marginTop: '4px' }}>{item}</p>
                    </div>
                ))}
            </div>
            <button className={styles.rightBtn} onClick={() => scroll("right")}>›</button>
        </div>
    )
}

export default CategoryAndBrands