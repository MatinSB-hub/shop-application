import { useEffect, useState } from "react";
import { getAllProducts, getOneProduct } from "../services/product.services";
import { createComment } from "../services/comment.services";
import { commentSchema } from "../validators/comment";
import validate from "../validators";

function useComment(onSuccess) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const submit = async (productID, commentText, selectedRate) => {
    const result = validate(commentSchema, {
      content: commentText,
      rating: selectedRate,
    });
    if (result) {
      const commentData = {
        productId: productID,
        content: commentText,
        rating: selectedRate,
      };

      try {
        setIsLoading(true);
        setError("");
        await createComment(commentData);
        onSuccess();
      } catch (err) {
        setError(err?.response?.data?.message || "خطا در ثبت کامنت");
        console.log(err?.response);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    submit,
    isLoading,
    error,
  };
}

export default useComment;
