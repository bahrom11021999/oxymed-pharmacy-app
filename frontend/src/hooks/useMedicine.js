import { useQuery } from "@tanstack/react-query";
import { apiGetMedicine } from "../api/medicines";
import { useParams } from "react-router-dom";

const useMedicine = () => {
  const { id } = useParams();

  const {
    data: medicine,
    isLoading,
    error,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["medicine", id],
    queryFn: () => apiGetMedicine(id),
  });

  return { medicine, isLoading, error, isError, isSuccess };
};

export default useMedicine;
