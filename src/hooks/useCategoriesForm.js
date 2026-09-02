import { useState } from "react";
import { createCategory } from "../services/category.sevices";

function useCategoriesForm(onSubmit) {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [error, setError] = useState(false);

  const submit = async (title, slug, description, iconFile, filters) => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("filters", JSON.stringify(filters));
    iconFile && formData.append("iconFile", iconFile);

    try {
      await createCategory(formData);
      onSubmit();
    } catch (err) {
      setError(err?.response?.data?.message || "خطا در ایجاد دسته بندی");
    } finally {
      setIsSubmiting(false);
    }
  };
  return { error, isSubmiting, submit };
}

export default useCategoriesForm;
