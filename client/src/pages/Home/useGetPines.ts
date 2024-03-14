import { newRequest } from "@/utils";
import { TPinType } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGetPines() {
  const {
    isLoading: loading,
    error,
    data,
  } = useQuery({
    queryKey: ["users_pins"],
    queryFn: async () => {
      try {
        let res = await newRequest({
          method: "get",
          url: "/pin",
        });

        return res.data as Array<TPinType>;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return {
    data,
    loading,
    error,
  };
}
