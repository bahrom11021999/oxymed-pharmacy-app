import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiCreateTransaction } from "../api/transactions";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const {
    mutate: createTransaction,
    status,
    error,
  } = useMutation({
    mutationFn: apiCreateTransaction,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["transactions"]);

      toast.success("Transaction created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const isCreating = status === "pending";

  return { createTransaction, isCreating, error };
}
