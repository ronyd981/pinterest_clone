import { useContext, useState } from "react";
import { useZorm } from "react-zorm";
import { UserContext } from "@/context";
import { TUserType } from "@/types";
import { newRequest } from "@/utils";
import { removePreventScroll } from "@/utils";

import LoginSchema from "./LoginSchema";

type TError = {
  response: {
    data: { detail: string };
    status: number;
  };
};

export function useLogin(changeModal: (modal: string | null) => void) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const { saveData } = useContext(UserContext);

  const zorm = useZorm("register", LoginSchema, {
    async onValidSubmit(e) {
      e.preventDefault();

      const email = e.data.email,
        password = e.data.password;

      try {
        setLoading(true);
        setError(null);

        let res = await newRequest({
          method: "post",
          data: {
            email,
            password,
          },
          url: "/auth/login",
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
