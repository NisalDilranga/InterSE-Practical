import { Outlet } from "react-router-dom";
import SideNav from "../sideNav/SideNav";

const Layout = () => {
  return (
    <div className="flex flex-col justify-start w-full h-screen">
      <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl ml-64">
        <h1 className="text-xl font-bold text-white">ffffffffffff</h1>
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
