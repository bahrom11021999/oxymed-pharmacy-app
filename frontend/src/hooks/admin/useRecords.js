import { useQuery } from "@tanstack/react-query";
import { apiGetTransactions } from "../../api/admin";

export function useRecords() {
  const {
    data: records,
    isRecordsLoading,
    error,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["admin-records"],
    queryFn: apiGetTransactions,
  });

  return { records, isRecordsLoading, error, isError, isSuccess };
}

export default useRecords;
