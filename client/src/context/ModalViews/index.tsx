import { createContext, useState } from "react";

type TData = {
  modal: "login" | "register" | "edit" | "delete" | null;
  changeModal: (modal: string | null) => void;
};

export const ModalViewsContext = createContext<TData>({
  modal: null,
  changeModal: () => {},
});

export const ModalProvider = ({ children }: { children: JSX.Element }) => {
  const [modal, setModal] = useState<
    "login" | "register" | "edit" | "delete" | null
  >(null);

  const changeModal = (modal: string | null) => {
    if (modal === "login") {
      setModal("login");
      return;
    }
    if (modal === "register") {
      setModal("register");
      return;
    }
    if (modal === "edit") {
      setModal("edit");
      return;
    }
    if (modal === "delete") {
      setModal("delete");
      return;
    }

    setModal(null);
  };

  const data = {
    modal,
    changeModal,
  };

  return (
    <ModalViewsContext.Provider value={data}>
      {children}
    </ModalViewsContext.Provider>
  );
};
