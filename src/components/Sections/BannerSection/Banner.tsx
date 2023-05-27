import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./Banner.scss";
import BannerImg from "../../assets/img/banners/banner1.jpg";

export function BannerSection() {
	return (
		<div className="banner">
			<div className="banner__container">
				<Swiper slidesPerView={1} slidesPerGroup={1} spaceBetween={40}>
					<SwiperSlide>
						<div className="banner__slide">
							<img src={BannerImg} alt="" />
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="banner__slide">
							<img src={BannerImg} alt="" />
						</div>
					</SwiperSlide>
				</Swiper>
			</div>
		</div>
	);
}
