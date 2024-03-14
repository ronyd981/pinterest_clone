import { useNavigate } from "react-router-dom";

import { TUserTypeWithoutToken } from "@/types";
import { newRequest } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export function useGetUser(id: string, idUserLogged?: string | undefined) {
  const navigate = useNavigate();
  const {
    isLoading: loadingPage,
    error,
    data: user,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const isEditRoute = location.pathname.endsWith("/edit");

        if (isEditRoute) {
          if (idUserLogged) {
            if (id !== idUserLogged) {
              navigate("/");
            }
          }
        }

        let res = await newRequest({
          method: "get",
          url: `users/${id}`,
        });

        return res.data as TUserTypeWithoutToken;
      } catch (error) {
        navigate("/");
      }
    },
    enabled: !!id && !!idUserLogged,
  });

  return {
    user,
    loadingPage,
  };
}
