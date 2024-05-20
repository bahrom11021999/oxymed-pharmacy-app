import { useQuery } from "@tanstack/react-query";
import { apiGetTransactions } from "../api/transactions";

const useTransactions = () => {
  const {
    data: transactions,
    isLoading,
    error,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: apiGetTransactions,
  });

  return { transactions, isLoading, error, isError, isSuccess };
};

export default useTransactions;
