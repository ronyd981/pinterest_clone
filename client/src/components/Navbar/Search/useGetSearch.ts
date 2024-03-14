import { TPinType } from "@/types";
import { newRequest } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useZorm } from "react-zorm";
import SearchSchema from "./SearchSchema";

export function useGetSearch() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (search: string) => {
      return newRequest({
        method: "get",
        url: `/pin/?title=${search}`,
      });
    },
    onSuccess: async (res) => {
      queryClient.invalidateQueries(["users_pins"]);
      return res.data as Array<TPinType>;
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const zorm = useZorm("search_pin", SearchSchema, {
    async onValidSubmit(e) {
      e.preventDefault();

      const title = e.data.title;

      mutation.mutate(title);
    },
  });

  return {
    zorm,
  };
}
