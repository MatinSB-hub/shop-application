import { useParams } from "react-router";
import ProductComments from "../Components/Templates/Product/Content/Comments";
import Description from "../Components/Templates/Product/Content/Description";
import HeroDetails from "../Components/Templates/Product/Content/HeroDetails";
import RelatedProducts from "../Components/Templates/Product/Content/RelatedProducts";
import Sidebar from "../Components/Templates/Product/Sidebar";
import useProduct from "../hooks/useProduct";

const ProductPage = () => {
  const { productID } = useParams();

  const { product, isLoading, error } = useProduct(productID);
  console.log(product);
  return (
    <main
      id="product-content"
      className="w-[95%] mx-auto grid grid-cols-8 gap-5  my-10"
    >
      {!isLoading && !error ? (
        <>
          <section className="col-span-6 space-y-10  *:p-5 *:border *:border-neutral-200  *:rounded-xl">
            <HeroDetails {...product} />
            <Description description={product?.description} />
            <RelatedProducts />
            <ProductComments />
          </section>
          <Sidebar {...product}/>
        </>
      ) : (
        "loading skeleton"
      )}
    </main>
  );
};

export default ProductPage;
