import { useQuery } from "@tanstack/react-query";
import { apiGetSummary } from "../../api/admin";

export function useSummary() {
  const {
    data: summary,
    isLoading: isSummaryLoading,
    error,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["admin-summary"],
    queryFn: apiGetSummary,
  });

  return { summary, isSummaryLoading, error, isError, isSuccess };
}
