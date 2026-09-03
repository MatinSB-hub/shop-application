import { useState } from "react";
import { createCategory } from "../services/category.sevices";
import validator from "../validators/index";
import { categoriesSchema } from "../validators/categories";

function useCategoriesForm(onSuccess) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const submit = async (title, slug, description, iconFile, filters) => {

    const result = validator(categoriesSchema, {
      title,
      slug,
      iconFile,
    });

    if (!result) return false;

    setIsSubmitting(true);
    const formData = new FormData();

    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("filters", JSON.stringify(filters));
    iconFile && formData.append("icon", iconFile);

    try {
      await createCategory(formData);
      onSuccess();
    } catch (err) {
      setError(err?.response?.data?.message || "خطا در ایجاد دسته بندی");
    } finally {
      setIsSubmitting(false);
    }
  };
  return { error, isSubmitting, submit };
}

export default useCategoriesForm;
