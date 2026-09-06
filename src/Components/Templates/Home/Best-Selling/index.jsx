import React from "react";
import SectionTitle from "../../../Common/SectionTitle";
import ProductCard from "../../../Common/Cards/ProductCard";
import useProducts from "../../../../hooks/useProducts";
import { Link } from "react-router";
import { array } from "zod";
import ProductCardSkeleton from "./components/ProductCardSkeleton";

const BestSelling = () => {
  const { products, isLoading, error } = useProducts();
  return (
    <section className="container my-[50px]">
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
      <div className="mt-10 w-full border rounded-2xl grid grid-cols-5 p-4 border-neutral-300 divide-x divide-neutral-200 gap-5">
        {isLoading &&
          Array.from({ length: 5 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}

        {!isLoading && error && (
          <p className="col-span-5 text-center text-red-500 py-8">{error}</p>
        )}

        {!isLoading &&
          products.length &&
          products
            .slice(0, 5)
            .map((product) => <ProductCard key={product._id} {...product} />)}
      </div>
    </section>
  );
};

export default BestSelling;
