import { useContext } from "react";
import { useParams } from "react-router-dom";

import { DataLoader } from "@/components";
import { FormData, HeaderInfo } from "./components";
import { UserContext } from "@/context";
import { useGetUser } from "@/hooks";

export default function EditProfile() {
  const { user: userLooged } = useContext(UserContext);
  const { id } = useParams<{ id: string }>();
  const { loadingPage, user } = useGetUser(id ?? "", userLooged?.id);

  if (loadingPage) return <DataLoader />;

  return (
    <main
      className="
      w-[95%] max-w-[1200px] flex flex-col gap-12 mx-auto pt-6
      md:pt-0
    "
    >
      <HeaderInfo />
      {user && <FormData user={user} />}
    </main>
  );
}
