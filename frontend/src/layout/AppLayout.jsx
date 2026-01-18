import { Outlet } from "react-router-dom";
import Navbar_Home from "../components/Navbar/Navbar_Home";

function AppLayout() {
  return (
    <div className="w-full min-h-screen bg-neutral-900 text-white flex flex-col items-center p-3">
      <Navbar_Home />
      <Outlet />
    </div>
  );
}

export default AppLayout;
