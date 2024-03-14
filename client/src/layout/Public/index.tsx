import { Outlet } from "react-router-dom";

import { Navbar } from "@/components";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="mt-20">
        <Outlet />
      </div>
    </>
  );
}
