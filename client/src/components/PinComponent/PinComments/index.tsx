import { AiFillHeart } from "react-icons/ai";
import { TCommentType } from "@/types";
import { useGetUser } from "@/hooks";
import { useLikeComment } from "../PinAddComment/useLikeComment";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context";

interface IPinComments {
  comment: TCommentType;
}

export default function PinComments({ comment }: IPinComments) {
  const [hasLike, setHasLike] = useState<boolean>(false);

  const { user, loadingPage } = useGetUser(comment.user_id);
  const { onLikeOrDislikeComment } = useLikeComment();
  const { user: userLogged } = useContext(UserContext);

  useEffect(() => {
    if (comment.likes.length > 0) {
      let hasLike = comment.likes.some((userId) => userId === userLogged?.id);

      if (hasLike) setHasLike(true);
    } else {
      setHasLike(false);
    }
  }, [comment, userLogged]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
          <span className="text-xs font-medium uppercase">
            {user?.first_name.charAt(0)}
          </span>
        </div>
        <div className="w-[calc(100%-32px)] pr-1">
          <p className="text-sm break-words">
            <span className="font-medium">{user?.first_name}</span>{" "}
            {comment.body}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">1 a</span>
            <div className="flex items-start">
              <AiFillHeart
                className={`
                text-lg cursor-pointer hover:text-red-500
                ${hasLike ? "text-red-500" : "text-gray-300"}
                `}
                onClick={() => onLikeOrDislikeComment(comment.id)}
              />
              {comment.likes.length > 0 && (
                <span className="text-xs text-gray-500">
                  {comment.likes.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
