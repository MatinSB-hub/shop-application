import { useState } from "react";
import { toast } from "sonner";
import { createSubCategory } from "../services/category.sevices";

function useSubCategoriesForm() {
  const [isSubmiting, setIsSubmiting] = useState();
  const [error, setError] = useState();
  const submit = async (title, slug, parent, description, filters) => {
    console.log("filtres:", filters);
    setIsSubmiting(true);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("parent", parent);
    formData.append("description", description);
    // formData.append("filters", filters);
    
    try {
      await createSubCategory(formData);
    } catch (err) {
      console.log("subCategories Error:", err.response);
      setError(err?.response?.data?.message || "خطا در ایجاد زیر دسته بندی");
    } finally {
      setIsSubmiting(false);
    }
  };
  return { submit, isSubmiting, error };
}

export default useSubCategoriesForm;
