import { AiOutlineClose } from "react-icons/ai";
import PinterestLogo from "@/assets/svg/pinterest.svg";
import { GoogleLogin } from "@react-oauth/google";

import { InputText, ClasicLoader } from "@/components";
import { useRegister } from "./useRegister";

interface IRegister {
  changeModal: (modal: string | null) => void;
}

export default function Register({ changeModal }: IRegister) {
  const { error, loading, zorm } = useRegister(changeModal);

  return (
    <div
      className="
      w-[95%] h- flex flex-col absolute bg-white py-6 rounded-2xl top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
      sm:w-[400px]
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
          Unlimited free access to the world's best ideas
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
        <InputText
          name="first_name"
          zorm={zorm}
          title={"Firstname"}
          placeholder={"John"}
        />
        <InputText
          name="last_name"
          zorm={zorm}
          title={"Lastname"}
          placeholder={"Doe"}
        />
        <button className="w-full h-8 mt-4 rounded-2xl text-sm text-white bg-primary-red hover:brightness-95">
          Sign up
        </button>
      </form>
      <div
        className="
        w-[75%] flex flex-col gap-2 mx-auto mt-2
        sm:w-[55%]
      "
      >
        <span className="text-sm font-medium text-center">OR</span>
        <GoogleLogin
          text="continue_with"
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
      {loading && (
        <div className="mt-4">
          <ClasicLoader />
        </div>
      )}
      {error && (
        <p className="text-xs text-center text-red-500 mt-4">{error}</p>
      )}
      <p className="text-[10px] text-primary-gray text-center mt-6">
        Already a member?{" "}
        <span
          onClick={() => changeModal("login")}
          className="font-bold cursor-pointer"
        >
          Log in
        </span>
      </p>
    </div>
  );
}
