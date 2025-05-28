import { FaCartPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import LogoutButton from "../common/LogoutButton";

const HomeNav = () => {
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();

  return (
    <div className="flex flex-col w-full">
      <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">Pizza Outlet</div>
          <div className="flex items-center space-x-6">
            <nav>
              <ul className="flex space-x-6">
                <li className="hover:text-blue-200 cursor-pointer transition-colors">
                  <Link to="/home">Home</Link>
                </li>
                <li className="hover:text-blue-200 cursor-pointer transition-colors">
                  <Link to="/cart">Cart</Link>
                </li>
                <li className="hover:text-blue-200 cursor-pointer transition-colors">
                  <Link to="/orders">Orders</Link>
                </li>
              </ul>
            </nav>
            <Link to="/cart" className="relative">
              <FaCartPlus className="w-6 h-6 hover:text-blue-200 cursor-pointer transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <LogoutButton className="hover:text-blue-200 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeNav;
