import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useGetUser } from "@/hooks";

import { DataLoader } from "@/components";
import { UserHeaderInfo, UserPines } from "./export";
import { UserContext } from "@/context";

export default function Profile() {
  const { user: userLooged } = useContext(UserContext);
  const { id } = useParams<{ id: string }>();
  const { loadingPage, user } = useGetUser(id ?? "", userLooged?.id);

  if (loadingPage) return <DataLoader />;

  return (
    <main
      className="
      flex flex-col gap-6 pt-6
      md:pt-0
    "
    >
      {user && userLooged && (
        <UserHeaderInfo user={user} userLooged={userLooged.id} />
      )}
      <UserPines id={id ?? ""} />
    </main>
  );
}
