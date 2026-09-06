import React from "react";
import SectionTitle from "../../../Common/SectionTitle";
import ProductCard from "../../../Common/Cards/ProductCard";
import useProducts from "../../../../hooks/useProducts";
import { Link } from "react-router";

const BestSelling = () => {
  const { products, isLoading, error } = useProducts();
  return (
    <section className="container my-[50px]">
      <SectionTitle text="پرفروش‌ترین ها" action={<Link to={"/products"} className="text-sm text-blue-500 hover:underline">مشاهده همه محصولات</Link>}/>
      <div className="mt-10 w-full border rounded-2xl grid grid-cols-5 p-4 border-neutral-300 divide-x divide-neutral-200 gap-5">
        {!isLoading && error && (
          <p className="col-span-5 text-center text-red-500 py-8">{error}</p>
        )}

        {!isLoading &&
          products.length &&
          products.map((product) => <ProductCard key={product._id} {...product}/>)}
      </div>
    </section>
  );
};

export default BestSelling;
