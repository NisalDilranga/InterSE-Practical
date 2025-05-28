import { NavLink } from "react-router-dom";

const SideNav = () => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 transform  translate-x-0 transition-transform duration-300 ease-in-out`}
    >
      <div className="flex flex-col h-full bg-gray-800 text-white shadow-xl w-64">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <span className="text-[17px] font-bold">Order Management System</span>
          </div>
        </div>{" "}
        <nav className="px-4 py-6 flex-1 overflow-y-auto">
          {" "}
          <div className="flex flex-col min-w-[100px] gap-4">
            {" "}
            <NavLink
              className={({ isActive }) =>
                `flex items-center w-full px-4 py-3 rounded-lg text-left transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white font-medium"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
              to={"/item-types"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
                Item Types Manage
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center w-full px-4 py-3 rounded-lg text-left transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white font-medium"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
              to={"/item-manage"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                  clipRule="evenodd"
                />
              </svg>
              Manage Item
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center w-full px-4 py-3 rounded-lg text-left transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white font-medium"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
              to={"/order-manage"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
              Orders
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center w-full px-4 py-3 rounded-lg text-left transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white font-medium"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
              to={"/page-4"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              Page 4
            </NavLink>
          </div>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="bg-gray-600 rounded-full h-10 w-10 flex items-center justify-center">
                <span className="text-lg font-semibold text-white">U</span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Admin</p>
              <p className="text-xs text-gray-400">admin@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
