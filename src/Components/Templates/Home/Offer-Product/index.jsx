import React from "react";
import SectionTitle from "../../../Common/SectionTitle";
import ProductCard from "../../../Common/Cards/ProductCard";
import useProduct from "../../../../hooks/useProduct";
import useProducts from "../../../../hooks/useProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCardSkeleton from "../Best-Selling/components/ProductCardSkeleton";
import { Autoplay } from "swiper/modules";
import withSlider from "../../../../HOCs/withSlider";

const OfferProducts = ({ products }) => {
  const offerProducts = products?.filter((product) => product.discount);
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
      {offerProducts.length > 0
        ? offerProducts.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard {...product} />
            </SwiperSlide>
          ))
        : "محصول با تخفیف یافت نشد"}
    </Swiper>
  );
};

export default withSlider(OfferProducts, "محصولات  تخفیف  دار");
