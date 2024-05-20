import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { apiGetTransaction } from "../api/transactions";

const useTransaction = () => {
  const { id } = useParams();

  const {
    data: transaction,
    isLoading,
    error,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["transaction", id],
    queryFn: () => apiGetTransaction(id),
  });

  return { transaction, isLoading, error, isError, isSuccess };
};

export default useTransaction;
