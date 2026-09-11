import React, { useEffect, useState } from "react";
import { getProductComments } from "../services/comment.services";

function useGetProductComments(info) {
  const [comments, setComments] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(false);
  const fetchComments = async () => {
    try {
      setIsloading(true);
      setError("");
      const data = await getProductComments(info);
      setComments(data);
    } catch (err) {
      setError(err?.response?.data?.message);
      console.log("err:", err);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return { comments, isLoading, error };
}

export default useGetProductComments;
