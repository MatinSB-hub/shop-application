import React from "react";
import SectionTitle from "../../../Common/SectionTitle";
import ProductCard from "../../../Common/Cards/ProductCard";
import useProduct from "../../../../hooks/useProduct";
import useProducts from "../../../../hooks/useProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCardSkeleton from "../Best-Selling/components/ProductCardSkeleton";
import { Autoplay } from "swiper/modules";

const OfferProducts = () => {
  const { products, isLoading, error } = useProducts();
  const offerProducts = products?.filter((product) => product.discount);
  return (
    <section className="container my-12.5">
      <SectionTitle text="محصولات پرتخفیف" />
      <div className="mt-10 w-full border rounded-2xl p-4 border-neutral-300 divide-x divide-neutral-200 gap-5">
        {isLoading && !error && (
          <Swiper slidesPerView={5}>
            {Array.from({ length: 5 }).map((_, index) => (
              <SwiperSlide>
                <ProductCardSkeleton />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {!isLoading && error && (
          <p className="col-span-5 text-center text-red-500 py-8">{error}</p>
        )}

        {!isLoading && products?.length > 0 && (
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
        )}
      </div>
    </section>
  );
};

export default OfferProducts;
