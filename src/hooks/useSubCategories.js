import{ useEffect, useState } from "react";
import { getAllSubCategories } from "../services/category.sevices";

function useSubCategories() {
  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data } = await getAllSubCategories();
      setSubCategories(data?.categories || []);
    } catch (err) {
      setError("خطا در ردیافت زیر دسته بندی ها");
      console.log("error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { isLoading, subCategories, reFetch: fetchData, error };
}

export default useSubCategories;
