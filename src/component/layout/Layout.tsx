import { Outlet } from "react-router-dom";
import SideNav from "../sideNav/SideNav";
import LogoutButton from "../common/LogoutButton";

const Layout = () => {
  return (
    <div className="flex flex-col justify-start w-full h-screen">
      <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl ml-64 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">
          Order Management System
        </h1>
        <LogoutButton className="bg-white text-blue-700 px-4 py-2 rounded-md hover:bg-gray-100" />
      </div>
      <div className="flex h-full bg-gray-100">
        <SideNav />
        <div className="ml-64 flex-1 flex flex-col p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
