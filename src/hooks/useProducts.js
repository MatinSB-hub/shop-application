import { useEffect, useState } from "react";
import { getAllProducts } from "../services/product.services";

function useProducts(limit = 10) {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [page, setPage] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [error, setError] = useState([]);

  const fetchProducts = async () => {
    setIsLoading(false);
    setError("");

    try {
      const res = await getAllProducts({ page, limit });
      setProducts(res?.data?.products || []);
      setPagination(res?.data?.pagination || null);
    } catch (err) {
      setError(err);
      console.log("خطا در دریافت محصولات");
    } finally {
      setIsLoading(false);
    }
  };

  const reFetchProducts = () => fetchProducts();

  useEffect(() => {
    fetchProducts();
  }, [page, limit]);

  return {
    products,
    pagination,
    page,
    setPage,
    isLoading,
    error,
    reFetchProducts,
  };
}

export default useProducts;
