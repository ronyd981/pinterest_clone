import { useQuery } from "@tanstack/react-query";
import { TCommentType } from "@/types";
import { newRequest } from "@/utils";

export function useGetComments(commentId: string) {
  const {
    isLoading: loadingComments,
    error,
    data: comments,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      try {
        let res = await newRequest({
          method: "get",
          url: `comment/${commentId}`,
        });

        return res.data as Array<TCommentType>;
      } catch (error) {
        console.log(error);
      }
    },
    enabled: !!commentId,
  });

  return {
    comments,
    loadingComments,
  };
}
