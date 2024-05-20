import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { apiLogout } from "../api/auth";
import toast from "react-hot-toast";

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: logout,
    status,
    error,
  } = useMutation({
    mutationFn: apiLogout,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);

      toast.success("Logout successful");

      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const isLoading = status === "pending";

  return { logout, isLoading, error };
};

export default useLogout;
