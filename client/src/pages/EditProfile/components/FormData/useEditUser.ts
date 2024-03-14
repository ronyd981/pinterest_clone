import { UserContext } from "@/context";
import { TUserTypeWithoutToken } from "@/types";
import { newRequest, popupFunction } from "@/utils";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useZorm } from "react-zorm";
import EditSchema from "./EditSchema";
import { AxiosError } from "axios";

type TData = {
  first_name: string;
  last_name: string;
  old_password?: string;
  password?: string;
};
interface IUserInfo {
  first_name?: string;
  last_name?: string;
  old_password?: string;
  password?: string;
}

export function useEditUser(user: TUserTypeWithoutToken) {
  const [isPasswordActive, setIsPasswordActive] = useState<boolean>(false);
  const [sendInputError, setSendInputError] = useState<boolean>(false);
  const [canSendChanges, setCanSendChanges] = useState(false);
  const [inputsInfoValue, setInputsInfoValue] = useState<IUserInfo>();
  const [valueToCheck, setValueToCheck] = useState<IUserInfo>();
  const { token, saveData } = useContext(UserContext);

  const queryClient = useQueryClient();

  const { mutate, isLoading: loading } = useMutation({
    mutationFn: (data: TData) => {
      return newRequest({
        method: "put",
        url: `/users/${user?.id}`,
        headers: { Authorization: `Bearer ${token}` },
        data: {
          first_name: data.first_name,
          last_name: data.last_name,
          old_password: data.old_password,
          password: data.password,
        },
      });
    },
    onSuccess: async (res) => {
      let userData = res.data as TUserTypeWithoutToken;

      popupFunction("User edited", "bg-green-400", "😄");

      setValueToCheck(inputsInfoValue);
      saveData(userData);
      setCanSendChanges(false);
      queryClient.invalidateQueries(["user_pins"]);
    },
    onError: (e) => {
      const error = e as AxiosError;

      if (error) {
        if (error.response?.data) {
          //@ts-ignore
          popupFunction(error.response.data.detail, "bg-red-400", "😔");
          return;
        }
      }
      popupFunction("Something went wrong", "bg-red-400", "😔");
    },
  });

  function hasOneButNotBoth(
    old_password: string | undefined,
    password: string | undefined
  ) {
    return (old_password && !password) || (!old_password && password);
  }

  const zorm = useZorm("edit_user", EditSchema, {
    async onValidSubmit(e) {
      e.preventDefault();
      setSendInputError(false);

      if (!canSendChanges) return;

      const first_name = e.data.first_name,
        last_name = e.data.last_name,
        old_password = e.data.old_password,
        password = e.data.password;

      const hasOneButNotBothCheck = hasOneButNotBoth(old_password, password);
      if (hasOneButNotBothCheck) {
        setSendInputError(true);
        return;
      }

      const data: TData = {
        first_name,
        last_name,
        old_password,
        password,
      };

      if (old_password || password) {
        e.target["password"].value = "";
        e.target["old_password"].value = "";
      }

      mutate(data);
    },
  });

  return {
    zorm,
    loading,
    isPasswordActive,
    setIsPasswordActive,
    sendInputError,
    canSendChanges,
    setCanSendChanges,
    inputsInfoValue,
    setInputsInfoValue,
    valueToCheck,
    setValueToCheck,
  };
}
