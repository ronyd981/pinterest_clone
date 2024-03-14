import { ClasicButton } from "@/components";
import { TUserTypeWithoutToken } from "@/types";
import { Link } from "react-router-dom";

interface IPinUserInfo {
  pinUserOwner: TUserTypeWithoutToken;
}

export default function PinUserInfo({ pinUserOwner }: IPinUserInfo) {
  return (
    <div className="flex justify-between items-center">
      <Link
        to={`/profile/${pinUserOwner.id}`}
        className="flex items-center gap-2"
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300">
          <span className="text-lg font-medium text-primary-gray uppercase">
            {pinUserOwner.first_name.charAt(0)}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium">
            {pinUserOwner.first_name} {pinUserOwner.last_name}
          </span>
          {/* <span className="text-xs">33 seguidores</span> */}
        </div>
      </Link>
      {/* <ClasicButton className="text-gray-800 bg-gray-200 hover:bg-gray-300">
        Follow
      </ClasicButton> */}
    </div>
  );
}
