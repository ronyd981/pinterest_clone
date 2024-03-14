import { useContext, useState } from "react";
import { useZorm } from "react-zorm";
import { UserContext } from "@/context";
import { TUserType } from "@/types";
import { newRequest } from "@/utils";
import { removePreventScroll } from "@/utils";

import RegisterSchema from "./RegisterSchema";

type TError = {
  response: {
    data: { detail: string };
    status: number;
  };
};

export function useRegister(changeModal: (modal: string | null) => void) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const { saveData } = useContext(UserContext);

  const zorm = useZorm("register", RegisterSchema, {
    async onValidSubmit(e) {
      e.preventDefault();

      const email = e.data.email,
        password = e.data.password,
        first_name = e.data.first_name,
        last_name = e.data.last_name;

      try {
        setLoading(true);
        setError(null);

        let res = await newRequest({
          method: "post",
          data: {
            email,
            password,
            first_name,
            last_name,
          },
          url: "/auth/register",
        });

        let data = res.data as TUserType;
        const { token, ...userData } = data;

        saveData(userData, token);
        removePreventScroll();
        changeModal(null);
      } catch (error) {
        let transformedError = error as TError;
        setError(transformedError.response.data.detail);
      } finally {
        setLoading(false);
      }
    },
  });

  return {
    zorm,
    loading,
    error,
  };
}
