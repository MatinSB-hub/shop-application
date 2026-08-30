import { getAllProducts } from "../services/product.services";

export const useUsers = async (limit) => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [page, setPage] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [error, setError] = useState([]);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await getAllUsers({ page, limit });
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
};
