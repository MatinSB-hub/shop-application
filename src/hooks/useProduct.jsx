import { useEffect, useState } from "react";
import { getAllProducts, getOneProduct } from "../services/product.services";

function useProduct(productID) {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      setError("");
      const res = await getOneProduct(productID);
      setProduct(res?.data?.product || []);
    } catch (err) {
      setError(err);
      console.log("خطا در دریافت محصول");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (productID) {
      fetchProduct();
    }
  }, [productID]);

  return {
    product,
    isLoading,
    error,
  };
}

export default useProduct;
