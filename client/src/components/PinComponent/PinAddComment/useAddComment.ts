import { useContext, useState } from "react";
import { useZorm } from "react-zorm";
import { ModalViewsContext, UserContext } from "@/context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newRequest } from "@/utils";
import { popupFunction } from "@/utils";
import CommentSchema from "./CommentSchema";

export function useAddComment(pinId: string) {
  const [inputValue, setInputValue] = useState<string>("");
  const { token } = useContext(UserContext);
  const { changeModal } = useContext(ModalViewsContext);

  const queryClient = useQueryClient();

  const {
    mutate,
    isLoading: loading,
    error,
  } = useMutation({
    mutationFn: (message: string) => {
      return newRequest({
        method: "post",
        url: `/comment/${pinId}`,
        headers: { Authorization: `Bearer ${token}` },
        data: {
          body: message,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
    onError: (error) => {
      popupFunction("Something went wrong", "bg-red-400", "😔");
      console.log(error);
    },
  });

  const zorm = useZorm("pin", CommentSchema, {
    async onValidSubmit(e) {
      e.preventDefault();

      if (!token) return changeModal("login");

      const message = e.data.message;

      setInputValue("");
      mutate(message);
    },
  });

  return {
    loading,
    error,
    zorm,
    inputValue,
    setInputValue,
  };
}
