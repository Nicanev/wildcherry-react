import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "./ImageGallery.scss"
import {Loader} from "../UI/Loader/Loader";
import {Pagination} from "swiper";

interface ImageGalleryProps {
    images: any[];
}


function ImageGallery({ images }: ImageGalleryProps) {
  if (!images || !images.length) {
    return <Loader/>
  }

 return (
    <div className="image-gallery-container">
      <Swiper spaceBetween={10} slidesPerView={1} className="image-gallery-swiper" pagination={true} modules={[Pagination]}>
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <img src={image.url} className="gallery__img" alt={`Image ${image.id}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}


export default ImageGallery;
