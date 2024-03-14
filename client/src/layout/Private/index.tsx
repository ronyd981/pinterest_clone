import { UserContext } from "@/context";
import { useEffect, useContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import { DataLoader } from "@/components";

export default function Private() {
  const { token, removeData } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      removeData();
      navigate("/");
    }
  }, [token]);

  if (!token) return <DataLoader />;

  return (
    <>
      <Outlet />
    </>
  );
}
