import { useQuery } from "@tanstack/react-query";
import { apiCheckAuth } from "../api/auth";

export function useCheckAuth() {
  const {
    data: user,
    status,
    error,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["user"],
    queryFn: apiCheckAuth,
  });

  const isLoading = status === "pending";

  return { user, isLoading, error, isError, isSuccess };
}
