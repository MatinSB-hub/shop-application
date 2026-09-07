import { useEffect, useState } from "react";
import { getAllProducts, getOneProduct } from "../services/product.services";

function useProduct(slug) {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [error, setError] = useState([]);

  const fetchProduct = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await getOneProduct(slug);
      setProduct(res?.data?.product)
    } catch (err) {
      setError(err);
      console.log("خطا در دریافت محصول");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  return {
    product,
    isLoading,
    error,
  };
}

export default useProduct;
