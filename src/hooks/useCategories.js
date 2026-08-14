import React, { useEffect, useState } from "react";
import { getAllCategories } from "../services/category.sevices";

function useCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const {data} = await getAllCategories();
        setCategories(data.categories)
      } catch (error) {
        console.log("error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {isLoading,categories}
}

export default useCategories;
