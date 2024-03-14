import { createContext, useEffect, useState } from "react";
//@ts-ignore
import Cookies from "js-cookie";

import { validateToken } from "@/utils";
import { TUserTypeWithoutToken } from "@/types";

type TData = {
  user: TUserTypeWithoutToken | undefined;
  token: string | undefined;
  saveData: (userData: TUserTypeWithoutToken, access_token?: string) => void;
  removeData: () => void;
};

export const UserContext = createContext<TData>({
  token: "",
  user: undefined,
  saveData: () => {},
  removeData: () => {},
});

export function UserProvider({ children }: { children: JSX.Element }) {
  const [token, setToken] = useState<string | undefined>(Cookies.get("token"));
  const [user, setUser] = useState<TUserTypeWithoutToken | undefined>(
    undefined
  );

  const saveData = (userData: TUserTypeWithoutToken, access_token?: string) => {
    setUser(userData);
    localStorage.setItem("user_data", JSON.stringify(userData));
    if (access_token) {
      Cookies.set("token", access_token);
      setToken(access_token);
    }
  };

  const removeData = async () => {
    try {
      setToken(undefined);
      setUser(undefined);
      localStorage.removeItem("user_data");
      Cookies.remove("token");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //@ts-ignore
    const validate = validateToken(token);

    if (validate && localStorage.getItem("user_data")) {
      setToken(token);
      //@ts-ignore
      setUser(JSON.parse(localStorage.getItem("user_data")));
    } else {
      removeData();
    }
  }, []);

  const data = {
    user,
    token,
    saveData,
    removeData,
  };
  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
}
