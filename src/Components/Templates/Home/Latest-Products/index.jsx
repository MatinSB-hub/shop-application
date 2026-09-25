import { Swiper, SwiperSlide } from "swiper/react";
import useProducts from "../../../../hooks/useProducts";
import ProductCard from "../../../Common/Cards/ProductCard";
import SectionTitle from "../../../Common/SectionTitle";
import { Autoplay } from "swiper/modules";
import ProductCardSkeleton from "../Best-Selling/components/ProductCardSkeleton";
import withSlider from "../../../../HOCs/withSlider";

const LatestProducts = ({products}) => {
  return (
    <Swiper
      slidesPerView={5}
      modules={[Autoplay]}
      autoplay={{ delay: 1500, disableOnInteraction: false }}
      breakpoints={{
        300: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 5,
        },
        1280: {
          slidesPerView: 5,
        },
      }}
      loop
    >
      {products?.slice(0, 10).map((product) => (
        <SwiperSlide key={product._id}>
          <ProductCard {...product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default withSlider(LatestProducts, "جدید ترین محصولات");
