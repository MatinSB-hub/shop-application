import React, { useEffect, useState } from "react";
import { getAllCategories } from "../services/category.sevices";

function useCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await getAllCategories();
        mounted && setCategories(data.categories);
      } catch (error) {
        mounted && console.log("error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => (mounted = false);
  }, []);

  return { isLoading, categories };
}

export default useCategories;
