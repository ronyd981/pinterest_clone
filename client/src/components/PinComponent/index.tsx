import { useContext } from "react";

import { DataLoader } from "@/components";
import { PinComments, PinImage, PinUserInfo, PinAddComment } from "./export";
import { TPinType } from "@/types";
import { useGetComments } from "./useGetComments";
import { UserContext } from "@/context";
import { useGetUser } from "@/hooks";

interface IPinInfo {
  pin: TPinType;
  pinId: string;
}

export default function PinComponent({ pin, pinId }: IPinInfo) {
  const { comments, loadingComments } = useGetComments(pinId);
  const { user: pinUserOwner } = useGetUser(pin.user_id);
  const { user } = useContext(UserContext);

  return (
    <section
      className="
      w-96 flex flex-col gap-2 p-4 rounded-2xl mx-auto shadow-lg overflow-y-auto
      md:w-[760px] md:flex-row
      lg:w-[800px]
    "
    >
      <PinImage image={pin.image} alt={pin.title} />
      <div
        className="
        w-full h-[600px] flex flex-col gap-4 px-4 pt-4 overflow-y-auto
        lg:w-[calc(100%-358px)]
      "
      >
        <div
          className={`
          h-full flex flex-col gap-2 overflow-y-auto
          `}
        >
          <div className="h-full flex flex-col gap-2 overflow-y-auto">
            <div className="flex flex-col gap-2 justify-between sticky -top-1">
              <h2
                className="text-2xl font-medium text-primary-gray truncate"
                title={pin.title}
              >
                {pin.title}
              </h2>
              <p className="text-sm text-secondary-gray line-clamp-2">
                {pin.description}
              </p>
              {pinUserOwner && <PinUserInfo pinUserOwner={pinUserOwner} />}
            </div>
            {loadingComments ? (
              <DataLoader />
            ) : comments && comments.length > 0 ? (
              <div
                className="
                h-[250px] flex flex-col gap-4 mt-4
                lg:h-full
              "
              >
                <h6 className="text-lg font-medium">Comentarios</h6>
                {comments.map((comment) => (
                  <PinComments key={comment.id} comment={comment} />
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-600 mt-2">
                No comments yet! Add one to start the conversation.
              </p>
            )}
          </div>
        </div>
        {user && (
          <PinAddComment
            firstUserLetter={user.first_name.charAt(0)}
            commentsLength={comments?.length}
            likes={pin.likes}
          />
        )}
      </div>
    </section>
  );
}
