import { useContext } from "react";
import { ModalViewsContext, UserContext } from "@/context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newRequest } from "@/utils";

export function useLikeComment() {
  const { token } = useContext(UserContext);
  const { changeModal } = useContext(ModalViewsContext);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn(commentId: string) {
      return newRequest({
        method: "put",
        url: `comment/like/${commentId}`,
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
    onError: (error) => console.log(error),
  });

  function onLikeOrDislikeComment(commentId: string) {
    if (!token) return changeModal("login");

    mutation.mutate(commentId);
  }

  return { onLikeOrDislikeComment };
}
