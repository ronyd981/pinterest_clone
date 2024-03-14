import { AiOutlineClose } from "react-icons/ai";
import PinterestLogo from "@/assets/svg/pinterest.svg";

import { InputText, ClasicLoader } from "@/components";
import { useLogin } from "./useLogin";

interface ILogin {
  changeModal: (modal: string | null) => void;
}

export default function Login({ changeModal }: ILogin) {
  const { error, loading, zorm } = useLogin(changeModal);

  return (
    <div
      className="
      w-[95%] flex flex-col gap-1 absolute bg-white py-6 rounded-2xl top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
      sm:w-[380px]
    "
    >
      <AiOutlineClose
        className="text-xl cursor-pointer ml-auto mr-4"
        onClick={() => changeModal(null)}
      />
      <figure className="w-9 h-9 mx-auto">
        <img
          src={PinterestLogo}
          className="w-full h-full"
          alt="Pinterest logo"
        />
      </figure>
      <div
        className="
        w-[80%] mx-auto
        sm:w-[65%]
      "
      >
        <h1 className="text-2xl font-medium text-center text-primary-gray">
          Log in to see more
        </h1>
      </div>
      <form
        className="
        w-[75%] flex flex-col gap-1 mx-auto mt-2 text-secondary-gray
        sm:w-[55%]
      "
        ref={zorm.ref}
      >
        <InputText
          name="email"
          zorm={zorm}
          title={"Email"}
          placeholder={"johndoe@mymail.com"}
        />
        <InputText
          name="password"
          zorm={zorm}
          title={"Password"}
          placeholder={"Password"}
          type={"password"}
        />
        <button className="w-full h-8 mt-4 rounded-2xl text-sm text-white bg-primary-red hover:brightness-95">
          Log in
        </button>
      </form>
      {loading && (
        <div className="mt-4">
          <ClasicLoader />
        </div>
      )}
      {error && (
        <p className="text-xs text-center text-red-500 mt-4">{error}</p>
      )}
      <p
        className="text-[10px] text-primary-gray text-center mt-6 cursor-pointer font-medium"
        onClick={() => changeModal("register")}
      >
        Not on Pinterest yet? Sign up
      </p>
    </div>
  );
}
