import React, { useEffect, useState } from "react";
import { getProductComments } from "../services/comment.services";

function useGetProductComments(info) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(false);
  const fetchComments = async () => {
    try {
      setIsloading(true);
      setError("");
      const { data } = await getProductComments(info);
      setComments(data.comments);
    } catch (err) {
      setError(err?.response?.data?.message || "خطایی در دریافت کامت های محصول رخ داده است");
      console.log("err:", err);
    } finally {
      setIsloading(false);
    }
  };

  const reFetchComments = () => fetchComments();

  useEffect(() => {
    reFetchComments();
  }, []);

  return { comments, reFetchComments, isLoading, error };
}

export default useGetProductComments;
