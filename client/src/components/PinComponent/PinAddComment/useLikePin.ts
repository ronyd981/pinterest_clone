import { useContext } from "react";
import { ModalViewsContext, UserContext } from "@/context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newRequest } from "@/utils";

export function useLikePin() {
  const { token } = useContext(UserContext);
  const { changeModal } = useContext(ModalViewsContext);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn(pinId: string) {
      return newRequest({
        method: "put",
        url: `pin/like/${pinId}`,
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["pin"]);
    },
    onError: (error) => console.log(error),
  });

  function onLikeOrDislikePin(pinId: string) {
    if (!token) return changeModal("login");

    mutation.mutate(pinId);
  }

  return { onLikeOrDislikePin };
}
