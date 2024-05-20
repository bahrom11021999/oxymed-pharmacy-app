import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiDeleteMedicine } from "../../api/admin";

export const useDeleteMedicine = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteRecord, isDeleting } = useMutation({
    mutationFn: (id) => apiDeleteMedicine(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries("admin-medicines");

      toast.success("Medicine deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteRecord, isDeleting };
};
