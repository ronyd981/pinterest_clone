import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "@/context";
import { BiChevronDown } from "react-icons/bi";

import { TUserTypeWithoutToken } from "@/types";

interface IProps {
  user: TUserTypeWithoutToken;
}

export default function PrivateOptions({ user }: IProps) {
  const { removeData } = useContext(UserContext);

  const navigate = useNavigate();

  const onLogout = () => {
    removeData();
    navigate("/");
  };

  return (
    <ul className="w-auto flex items-center">
      <li className="p-2 rounded-full hover:bg-gray-200">
        <Link to={`/profile/${user?.id}`}>
          <div
            className="
            w-10 h-10 flex items-center justify-center rounded-full bg-gray-300
            sm:w-6 sm:h-6
            "
            title={`${user?.first_name} ${user?.last_name}`}
          >
            <span className="text-xs font-medium uppercase">
              {user?.first_name.charAt(0)}
            </span>
          </div>
        </Link>
      </li>
      <li
        className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-200 group relative cursor-pointer"
        tabIndex={3}
      >
        <div
          className="w-5 h-5 hidden group-focus-within:block absolute z-30 rounded-full top-0 right-0 cursor-pointer"
          onClick={() => {
            //@ts-ignore
            document.activeElement?.blur();
          }}
        ></div>
        <BiChevronDown className="text-lg text-gray-400" />
        <div className="w-48 hidden group-focus-within:flex flex-col gap-2 p-2 absolute top-6 right-0 bg-white shadow-md rounded-md">
          <Link
            to={`/profile/${user?.id}`}
            className="flex items-center gap-2 hover:bg-gray-300"
            onClick={() => {
              //@ts-ignore
              document.activeElement?.blur();
            }}
          >
            <div className="w-16">
              <div className="w-12 h-12 flex items-center justify-center mx-auto bg-gray-300 rounded-full">
                <span className="text-lg font-medium uppercase">
                  {user?.first_name.charAt(0)}
                </span>
              </div>
            </div>
            <div className="w-[calc(100%-56px)] h-full flex justify-between flex-col px-2">
              <p className="text-sm font-medium truncate">
                {user?.first_name} {user?.last_name}
              </p>
              <span className="text-xs text-gray-600 truncate">Personal</span>
              <p className="text-xs text-gray-600 truncate">{user?.email}</p>
            </div>
          </Link>
          <div
            className="px-2 py-0.5 hover:bg-gray-300 cursor-pointer"
            onClick={() => {
              onLogout();
              //@ts-ignore
              document.activeElement?.blur();
            }}
          >
            <span className="text-xs font-medium">Log out</span>
          </div>
        </div>
      </li>
    </ul>
  );
}
