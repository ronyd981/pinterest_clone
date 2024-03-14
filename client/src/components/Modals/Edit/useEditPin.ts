import { useContext, useState } from "react";
import { useZorm } from "react-zorm";
import { newRequest } from "@/utils";
import { popupFunction } from "@/utils";
import { UserContext } from "@/context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import EditSchema from "./EditSchema";
import { TPinType } from "@/types";

type TData = {
  title: string;
  description: string;
  url: string;
};

export function useEditPin(
  pin: TPinType | undefined,
  changeModal: (modal: string | null) => void
) {
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useContext(UserContext);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: TData) => {
      setLoading(true);
      return newRequest({
        method: "put",
        url: `/pin/${pin?.id}`,
        headers: { Authorization: `Bearer ${token}` },
        data: {
          title: data.title,
          description: data.description,
          url: data.url,
        },
      });
    },
    onSuccess: async () => {
      if (!pin) return;

      setLoading(false);
      popupFunction("Pin edited", "bg-green-400", "😄");
      changeModal(null);
      queryClient.invalidateQueries(["user_pins"]);
    },
    onError: (error) => {
      setLoading(false);
      popupFunction("Something went wrong", "bg-red-400", "😔");
      changeModal(null);
      console.log(error);
    },
  });

  const zorm = useZorm("pin", EditSchema, {
    async onValidSubmit(e) {
      e.preventDefault();

      const title = e.data.title,
        description = e.data.description,
        url = e.data.url;

      const data: TData = {
        title,
        description,
        url,
      };

      mutation.mutate(data);
    },
  });

  return {
    zorm,
    loading,
  };
}
