import { useQuery } from "@tanstack/react-query";
import { apiGetTransactions } from "../../api/admin";

const useTransactions = () => {
  const {
    data: transactions,
    isLoading,
    error,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["admin-transactions"],
    queryFn: apiGetTransactions,
  });

  return { transactions, isLoading, error, isError, isSuccess };
};

export default useTransactions;
