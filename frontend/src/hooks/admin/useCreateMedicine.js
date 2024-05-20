import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { apiCreateMedicine } from "../../api/admin";

export function useCreateMedicine() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const {
    mutate: createMedicine,
    status,
    error,
  } = useMutation({
    mutationFn: apiCreateMedicine,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["admin-medicines"]);

      toast.success("Medicine created successfully");

      navigate("/admin/dashboard");
    },
    onError: (error) => {
      toast.error("An error occurred. Please try again. 🙁");
    },
  });

  const isCreating = status === "pending";

  return { createMedicine, isCreating, error };
}
