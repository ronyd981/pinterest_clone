import { useContext, useState } from "react";
import { deleteImage } from "@/firebase";
import { TPinType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newRequest } from "@/utils";
import { UserContext } from "@/context";
import { popupFunction } from "@/utils";

export function useDeletePin(
  pin: TPinType | undefined,
  changeModal: (modal: string | null) => void
) {
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useContext(UserContext);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (pinId: string) => {
      setLoading(true);
      return newRequest({
        method: "delete",
        url: `/pin/${pin?.id}`,
        headers: { Authorization: `Bearer ${token}` },
        data: {
          body: pinId,
        },
      });
    },
    onSuccess: async () => {
      if (!pin) return;

      await deleteImage(pin.image);

      setLoading(false);
      popupFunction("Pin deleted", "bg-green-400", "😄");
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

  const deletePin = () => {
    if (!pin) return;

    mutation.mutate(pin.id);
  };

  return {
    deletePin,
    loading,
  };
}
