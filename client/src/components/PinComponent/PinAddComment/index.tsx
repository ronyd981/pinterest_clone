import { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";

import { useAddComment } from "./useAddComment";
import { useParams } from "react-router-dom";
import { UserContext } from "@/context";
import { useLikePin } from "./useLikePin";
import { FormData } from "./components";

interface IPinAddComment {
  firstUserLetter: string;
  commentsLength: number | undefined;
  likes: Array<string>;
}

export default function PinAddComment({
  firstUserLetter,
  commentsLength,
  likes,
}: IPinAddComment) {
  const [hasLike, setHasLike] = useState<boolean>(false);

  const { id } = useParams();

  const { loading, error, zorm, inputValue, setInputValue } = useAddComment(
    id ?? ""
  );
  const { onLikeOrDislikePin } = useLikePin();

  const { user: userLogged } = useContext(UserContext);

  useEffect(() => {
    if (likes.length > 0) {
      let hasLike = likes.some((userId) => userId === userLogged?.id);

      if (hasLike) setHasLike(true);
    } else {
      setHasLike(false);
    }
  }, [likes, userLogged]);

  return (
    <div
      className="
      w-full flex flex-col gap-4 mt-auto pt-2 border-t border-black relative
      md:max-h-[150px]
    "
    >
      <div
        className="
        flex items-center justify-between
        md:h-5
      "
      >
        <h3 className="text-lg font-medium">Comments {commentsLength}</h3>
        <div className="flex items-center gap-2">
          {likes.length > 0 && (
            <div className="flex items-center gap-0.5">
              <AiFillHeart className="text-lg text-red-500" />
              <span className="text-sm">{likes.length}</span>
            </div>
          )}
          <AiFillHeart
            className={`
              text-2xl cursor-pointer hover:text-red-500 
              ${hasLike ? "text-red-500" : "text-gray-300"}
              `}
            onClick={() => onLikeOrDislikePin(id ?? "")}
          />
        </div>
      </div>
      <div
        className="
        flex justify-between gap-2
        md:h-[calc(100%-36px)]
      "
      >
        <div className="w-8 h-full flex items-center justify-center">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
            <span className="font-medium uppercase">{firstUserLetter}</span>
          </div>
        </div>
        <FormData
          zorm={zorm}
          loading={loading}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      </div>
    </div>
  );
}
