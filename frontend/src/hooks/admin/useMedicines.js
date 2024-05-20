import { useQuery } from "@tanstack/react-query";
import { apiGetMedicines } from "../../api/admin";

export function useMedicines() {
  const {
    data: medicines,
    isLoading: isMedicinesLoading,
    error,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["admin-medicines"],
    queryFn: apiGetMedicines,
  });

  return { medicines, isMedicinesLoading, error, isError, isSuccess };
}
