import { useEffect, useState } from "react";
import { useZorm } from "react-zorm";
import { useQuery } from "@tanstack/react-query";
import { TPinType } from "@/types";
import { newRequest } from "@/utils";
import SearchSchema from "./SearchSchema";

export function useGetPines() {
  const [search, setSearch] = useState<string>("");

  const {
    isLoading: loading,
    error,
    data,
    refetch,
  } = useQuery({
    queryKey: ["users_pins"],
    queryFn: async () => {
      try {
        let res = await newRequest({
          method: "get",
          url: `/pin/${search ? "?title=" + search : ""}`,
        });

        return res.data as Array<TPinType>;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const zorm = useZorm("search_pin", SearchSchema, {
    async onValidSubmit(e) {
      e.preventDefault();

      const title = e.data.title;

      setSearch(title);
    },
  });

  useEffect(() => {
    refetch();
  }, [search]);

  return {
    data,
    loading,
    error,
    zorm,
  };
}
