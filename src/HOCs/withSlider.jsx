import React from "react";
import useProducts from "../hooks/useProducts";
import SectionTitle from "../Components/Common/SectionTitle";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCardSkeleton from "../Components/Templates/Home/Best-Selling/components/ProductCardSkeleton";
import { Autoplay } from "swiper/modules";

function withSlider(WrappedComponent,sliderTitle) {
  return function SliderWarprer() {
    const { products, isLoading, error } = useProducts();
    return (
      <section className="container my-12.5">
        <SectionTitle
          text={sliderTitle}
          action={
            <Link
              to={"/products"}
              className="text-sm text-blue-500 hover:underline"
            >
              مشاهده همه محصولات
            </Link>
          }
        />

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

              <WrappedComponent products={products} />

          )}
        </div>
      </section>
    );
  };
}

export default withSlider;
