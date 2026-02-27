import React from "react";
import styles from './ProductDetails.module.scss'
import { useParams } from "react-router-dom";
import { useGetProductDetails } from "../../common/queries/useGetProductDetails";
import NoSearchFound from "../noSearchFound/NoSearchFound";
import QuantityStepper from "../../components/quantityStepper/QuantityStepper";
import { Rating } from "@smastrom/react-rating";
import { formatCurrency } from "../../helpers/currencyFunction";
import { BsLightningCharge } from "react-icons/bs";
import { LuShieldCheck } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { LiaUndoAltSolid } from "react-icons/lia";
import ProductDetailsTab from "../../components/productDetailsTab/ProductDetailsTab";
import ProductGallery from "../../components/productGallery/ProductGallery";

const ProductDetails = () => {
    const { sku } = useParams();
    const productData = useGetProductDetails(sku ?? '');
    const product = productData?.[0] ?? {}
    const galleryImages = product?.images?.map((img: string) => ({
        original: img,
        thumbnail: img,
    }));
    console.log(productData)
    return (
        <div>
            {productData?.length === 0 ? <NoSearchFound />
                :
                <div>
                    <ProductGallery images={galleryImages} />
                    <div>
                        <p className={styles.title}>{product?.title || ''}</p>
                        <div className={styles.ratingContainer}>
                            <Rating
                                value={product?.rating}
                                style={{ maxWidth: 100 }}
                                readOnly
                            />
                            <p>{product?.rating?.toFixed(1) || 0}<span>{`(${product?.ratingCount} ratings)`}</span></p>
                        </div>
                        <div className={styles.priceContianer}>
                            <p className={styles.specialPrice}>{formatCurrency(product?.specialPrice)}</p>
                            <p className={styles.price}>{formatCurrency(product?.price)}</p>
                            <p className={styles.discountPercentage}>{`Save ${product?.discountPercentage}%`}</p>
                        </div>
                        {product?.stock > 1 ? <p className={styles.inStock}>In Stock and Ready to Ship</p> : <p className={styles.outOfStock}>Out of Stock</p>}
                        {product?.features?.length > 0 ? <ul className={styles.featureContainer}>
                            {product?.features.map((feature: any) => <li key={feature} className={styles.feature}>{feature}</li>)}
                        </ul> : null}
                        <div className={styles.btnContainer}>
                            <QuantityStepper product={product} />
                            <button className={styles.buyNow}><BsLightningCharge size={22} /> Buy Now</button>
                        </div>
                        <div className={styles.horizonalLine}></div>
                        <div className={styles.footerContainer}>
                            <p><span className={styles.footerIcon}><TbTruckDelivery color="#3B82F6" size={20} /></span> Free Delivery</p>
                            <p><span className={styles.footerIcon}><LiaUndoAltSolid color="#3B82F6" size={20} /></span> {product?.returnPolicy?.returnable ? `${product?.returnPolicy?.returnWindowDays} Days Return` : 'Not Returnable'}</p>
                            <p><span className={styles.footerIcon}><LuShieldCheck color="#3B82F6" size={20} /></span> {product?.warranty?.available ? `${product?.warranty?.durationMonths} Months` : 'No Warranty on this Product'}</p>
                        </div>
                        <ProductDetailsTab product={product} />
                    </div>
                </div>
            }
        </div>
    )
}

export default ProductDetails