import { useQuery } from "@tanstack/react-query";
import { apiGetUsers } from "../../api/admin";

export function useUsers() {
  const {
    data: users,
    isLoading,
    error,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: apiGetUsers,
  });

  return { users, isLoading, error, isError, isSuccess };
}
