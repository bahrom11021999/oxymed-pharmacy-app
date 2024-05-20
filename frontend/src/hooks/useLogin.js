import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { apiLogin } from "../api/auth";
import toast from "react-hot-toast";

const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: login,
    status,
    error,
  } = useMutation({
    mutationFn: ({ username, password }) => apiLogin(username, password),
    onSuccess: (data) => {
      const isAdmin = data?.data?.role === "admin";

      queryClient.invalidateQueries(["user"]);

      toast.success("Logged in successfully");

      if (isAdmin) {
        navigate("/admin/dashboard");
        return;
      }

      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const isLoading = status === "pending";

  return { login, isLoading, error };
};

export default useLogin;
