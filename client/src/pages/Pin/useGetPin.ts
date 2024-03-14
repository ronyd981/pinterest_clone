import { newRequest } from "@/utils";
import { TPinType } from "@/types";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function useGetPin(pinId: string) {
  const navigate = useNavigate();

  const {
    isLoading: loading,
    error,
    data: pin,
  } = useQuery({
    queryKey: ["pin"],
    queryFn: async () => {
      try {
        let res = await newRequest({
          method: "get",
          url: `pin/${pinId}`,
        });

        return res.data as TPinType;
      } catch (error) {
        navigate("/");
      }
    },
    enabled: !!pinId,
  });

  return {
    pin,
    loading,
  };
}
