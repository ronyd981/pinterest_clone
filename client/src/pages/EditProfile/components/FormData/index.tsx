import { useEffect, ChangeEvent } from "react";
import { DataLoader } from "@/components";
import { TUserTypeWithoutToken } from "@/types";
import { useEditUser } from "./useEditUser";

interface IProps {
  user: TUserTypeWithoutToken;
}
interface IUserInfo {
  first_name?: string;
  last_name?: string;
  old_password?: string;
  password?: string;
}

export default function FormData({ user }: IProps) {
  const {
    loading,
    zorm,
    isPasswordActive,
    setIsPasswordActive,
    sendInputError,
    canSendChanges,
    setCanSendChanges,
    setInputsInfoValue,
    inputsInfoValue,
    valueToCheck,
    setValueToCheck,
  } = useEditUser(user);

  const openPasswordOptions = () => {
    return setIsPasswordActive((prev) => !prev);
  };

  const isFirstNameErrored = !!zorm.errors["first_name"]();
  const isLastNameErrored = !!zorm.errors["last_name"]();
  const isOldPasswordErrored = !!zorm.errors["old_password"]();
  const isPasswordErrored = !!zorm.errors["password"]();

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const newInputsInfoValue = {
      ...inputsInfoValue,
      [e.target.name]: e.target.value,
    };

    setInputsInfoValue(newInputsInfoValue);
  };

  const hasInputChanged = () => {
    if (
      inputsInfoValue?.first_name !== valueToCheck?.first_name ||
      inputsInfoValue?.last_name !== valueToCheck?.last_name ||
      inputsInfoValue?.old_password !== valueToCheck?.old_password ||
      inputsInfoValue?.password !== valueToCheck?.password
    ) {
      return setCanSendChanges(true);
    }
    return setCanSendChanges(false);
  };

  useEffect(() => {
    const { email, id, ...userData } = user;
    const newInputData = {
      old_password: "",
      password: "",
      ...userData,
    };

    setInputsInfoValue(newInputData);
    setValueToCheck(newInputData);
  }, [user]);

  useEffect(() => {
    hasInputChanged();
  }, [inputsInfoValue]);

  return (
    <form
      className="
      w-80 mx-auto
    "
      ref={zorm.ref}
    >
      <fieldset className="w-full flex flex-col gap-5" disabled={loading}>
        <div className="w-full flex gap-3">
          <div className="w-1/2 flex flex-col gap-1">
            <label htmlFor="first_name" className="text-xs text-secondary-gray">
              First name
            </label>
            <input
              type="text"
              className={`
              w-full h-8 outline-none px-2 text-sm border border-gray-500 rounded-md
              focus:border-[3px] focus:border-blue-400
              ${isFirstNameErrored && "border-red-500"}
            `}
              onChange={onChangeInput}
              name="first_name"
              defaultValue={user.first_name}
            />
            {zorm.errors["first_name"]((e) => (
              <span className="text-xs text-red-500">{e.message}</span>
            ))}
          </div>
          <div className="w-1/2 flex flex-col gap-1">
            <label htmlFor="last_name" className="text-xs text-secondary-gray">
              Last name
            </label>
            <input
              type="text"
              className={`
              w-full h-8 outline-none px-2 text-sm border rounded-md
              focus:border-[3px] focus:border-blue-400
              ${isLastNameErrored ? "border-red-500" : "border-gray-500"}
            `}
              onChange={onChangeInput}
              name="last_name"
              defaultValue={user.last_name}
            />
            {zorm.errors["last_name"]((e) => (
              <span className="text-xs text-red-500">{e.message}</span>
            ))}
          </div>
        </div>
        <button
          className={`
          max-w-max px-4 py-1.5 rounded-md text-sm font-medium hover:brightness-95
          ${isPasswordActive ? "bg-gray-300" : "bg-primary-red text-white"}
        `}
          type="button"
          onClick={openPasswordOptions}
        >
          ChangePassword
        </button>
        {isPasswordActive && (
          <>
            <div className="w-full flex flex-col gap-1">
              <label
                htmlFor="old_password"
                className="text-xs text-secondary-gray"
              >
                Old password
              </label>
              <input
                type="password"
                className={`
                w-full h-8 outline-none px-2 text-sm border border-gray-500 rounded-md
                focus:border-[3px] focus:border-blue-400
                ${isOldPasswordErrored || (sendInputError && "border-red-500")}
              `}
                onChange={onChangeInput}
                name="old_password"
              />
              {zorm.errors["old_password"]((e) => (
                <span className="text-xs text-red-500">{e.message}</span>
              ))}
            </div>
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="password" className="text-xs text-secondary-gray">
                New password
              </label>
              <input
                type="password"
                className={`
                w-full h-8 outline-none px-2 text-sm border border-gray-500 rounded-md
                focus:border-[3px] focus:border-blue-400
                ${isPasswordErrored || (sendInputError && "border-red-500")}
              `}
                onChange={onChangeInput}
                name="password"
              />
              {zorm.errors["password"]((e) => (
                <span className="text-xs text-red-500">{e.message}</span>
              ))}
            </div>
            {sendInputError && (
              <span className="text-xs text-red-500">
                You must fill in both fields
              </span>
            )}
          </>
        )}
        <button
          className={`
          max-w-max px-4 py-1.5 rounded-md text-sm font-medium hover:brightness-95
          ${
            loading || !canSendChanges
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-primary-red text-white"
          }
        `}
          type="submit"
          disabled={loading}
        >
          Save
        </button>
      </fieldset>
      {loading && <DataLoader />}
    </form>
  );
}
