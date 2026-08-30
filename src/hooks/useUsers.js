import { useEffect, useState } from "react";
import { getAllUsers } from "../services/users.services";

function useUsers(limit) {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await getAllUsers({ page, limit });
      console.log("res:", res);
      setUsers(res?.data?.users || []);
      setPagination(res?.data?.pagination || null);
    } catch (err) {
      setError(err);
      console.log("خطا در دریافت کاربران");
    } finally {
      setIsLoading(false);
    }
  };

  const reFetchUsers = () => fetchUsers();

  useEffect(() => {
    fetchUsers();
  }, [page, limit]);

  return {
    users,
    pagination,
    page,
    setPage,
    isLoading,
    error,
    reFetchUsers,
  };
}

export default useUsers;
