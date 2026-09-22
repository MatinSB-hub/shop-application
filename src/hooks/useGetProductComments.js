import React, { useEffect, useState } from "react";
import { getProductComments } from "../services/comment.services";

function useGetProductComments(info) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(false);
  const fetchComments = async (parameters) => {
    try {
      setIsloading(true);
      setError("");
      const { data } = await getProductComments(parameters);
      setComments(data);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "خطایی در دریافت کامت های محصول رخ داده است",
      );
      console.log("err:", err);
    } finally {
      setIsloading(false);
    }
  };

  const reFetchComments = (info) => fetchComments(info);

  useEffect(() => {
    fetchComments(info);
  }, []);

  return { comments, reFetchComments, isLoading, error };
}

export default useGetProductComments;
