import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext, ModalViewsContext } from "@/context";

import PinterestLogo from "@/assets/svg/pinterest.svg";

import { PrivateOptions, Search } from "./export";
import { ClasicButton, Modals } from "@/components";

export default function Navbar() {
  const { token, user } = useContext(UserContext);
  const { changeModal, modal } = useContext(ModalViewsContext);

  return (
    <nav
      className="
      w-full flex justify-between gap-4 px-6 py-4 fixed top-0 z-20 bg-white
      sm:px-4 sm:py-4
    "
    >
      {modal && <Modals changeModal={changeModal} modalView={modal} />}
      <ul className="flex items-center gap-2">
        <li
          className="
          w-10 h-10 rounded-full hover:bg-gray-200
          sm:w-7 sm:h-7
        "
        >
          <Link
            to="/"
            className="w-full h-full flex items-center justify-center"
          >
            <img
              src={PinterestLogo}
              className="w-full h-full"
              alt="Pinterest logo"
            />
          </Link>
        </li>
        <div
          className="
          hidden items-center
          sm:flex
        "
        >
          <li>
            <Link to="/">
              <span
                className="
                text-sm font-medium px-3 py-2 rounded-2xl
                hover:bg-black hover:text-white
              "
              >
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link to="/today">
              <span
                className="
                text-sm font-medium px-3 py-2 rounded-2xl
                hover:bg-black hover:text-white
              "
              >
                Explore
              </span>
            </Link>
          </li>
          {token && (
            <li>
              <Link to="/create-pin">
                <span
                  className="
                  text-sm font-medium px-3 py-2 rounded-2xl
                  hover:bg-black hover:text-white
                "
                >
                  Create
                </span>
              </Link>
            </li>
          )}
        </div>
      </ul>
      <Search />
      {token && user ? (
        <PrivateOptions user={user} />
      ) : (
        <ul className="w-auto flex items-center gap-1">
          <ClasicButton
            className="w-20 hover:bg-gray-200"
            onClick={() => changeModal("login")}
          >
            Log in
          </ClasicButton>
          <ClasicButton
            className="w-24 bg-gray-200 hover:bg-gray-200"
            onClick={() => changeModal("register")}
          >
            Sign up
          </ClasicButton>
        </ul>
      )}
    </nav>
  );
}
