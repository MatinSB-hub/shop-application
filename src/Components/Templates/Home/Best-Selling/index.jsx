import React from "react";
import SectionTitle from "../../../Common/SectionTitle";
import ProductCard from "../../../Common/Cards/ProductCard";
import useProducts from "../../../../hooks/useProducts";
import { Link } from "react-router";
import { array } from "zod";
import ProductCardSkeleton from "./components/ProductCardSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import Slider from "../../Product/Content/RelatedProducts/Slider";
import { Autoplay } from "swiper/modules";

const BestSelling = () => {
  const { products, isLoading, error } = useProducts();
  return (
    <section className="container my-12.5">
      <SectionTitle
        text="پرفروش‌ترین ها"
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
        {isLoading &&
          Array.from({ length: 55 }).map((_, index) => <ProductCardSkeleton />)}

        {!isLoading && error && (
          <p className="col-span-5 text-center text-red-500 py-8">{error}</p>
        )}

        {!isLoading && products.length && (
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
            {products.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductCard {...product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default BestSelling;
