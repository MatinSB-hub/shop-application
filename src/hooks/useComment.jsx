import { useEffect, useState } from "react";
import { getAllProducts, getOneProduct } from "../services/product.services";
import { createComment } from "../services/comment.services";

function useComment(onSuccess) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const submit = async (comment) => {
    try {
      setIsLoading(true);
      setError("");
      await createComment(comment);
      onSuccess();
    } catch (err) {
      setError(err?.response?.data?.message || "خطا در ثبت کامنت");
      console.log("خطا در ثبت کامنت");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submit,
    isLoading,
    error,
  };
}

export default useComment;
