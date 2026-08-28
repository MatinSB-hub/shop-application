import React, { useEffect, useState } from "react";
import { getAllCategories } from "../services/category.sevices";

function useCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data } = await getAllCategories();
      setCategories(data?.categories || []);
    } catch (err) {
      setError("خطا در ردیافت دسته بندی ها");
      console.log("error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { isLoading, categories, reFetchCategories: fetchData, error };
}

export default useCategories;
