import { newRequest } from "@/utils";
import { TPinType } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGetUserPines(userId: string) {
  const {
    isLoading: loading,
    error,
    data,
  } = useQuery({
    queryKey: ["user_pins"],
    queryFn: async () => {
      try {
        let res = await newRequest({
          method: "get",
          url: `pin/?user_id=${userId}`,
        });

        return res.data as Array<TPinType>;
      } catch (error) {
        console.log(error);
      }
    },
    enabled: !!userId,
  });

  return {
    data,
    loading,
  };
}
