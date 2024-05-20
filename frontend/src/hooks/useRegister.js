import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { apiRegister } from "../api/auth";
import toast from "react-hot-toast";

const useRegister = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: register,
    status,
    error,
  } = useMutation({
    mutationFn: ({ username, password }) => apiRegister(username, password),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);

      toast.success("Register successful");

      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const isLoading = status === "pending";

  return { register, isLoading, error };
};

export default useRegister;
