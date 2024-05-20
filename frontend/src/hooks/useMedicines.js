import { useQuery } from "@tanstack/react-query";

import { apiGetMedicines } from "../api/medicines";

const useMedicines = () => {
  const {
    data: medicines,
    isLoading,
    error,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["medicines"],
    queryFn: apiGetMedicines,
  });

  return { medicines, isLoading, error, isError, isSuccess };
};

export default useMedicines;
