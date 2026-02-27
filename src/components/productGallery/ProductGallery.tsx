import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import styles from "./ProductGallery.module.scss";

interface GalleryImage {
  original: string;
  thumbnail: string;
}

interface ProductGalleryProps {
  images: GalleryImage[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null); // store thumbnail swiper instance

  return (
    <div className={styles.galleryWrapper}>
      {/* Main Swiper */}
      <Swiper
        modules={[Thumbs]}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        className={styles.mainSwiper}
      >
        {images.map((img: GalleryImage, index: number) => (
          <SwiperSlide key={index}>
            <img src={img.original} alt={`Product ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper} // ✅ store instance in state
        modules={[Thumbs, FreeMode]}
        spaceBetween={8}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress
        className={styles.thumbsSwiper}
      >
        {images.map((img: GalleryImage, index: number) => (
          <SwiperSlide key={index}>
            <img src={img.thumbnail} alt={`Thumbnail ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductGallery;