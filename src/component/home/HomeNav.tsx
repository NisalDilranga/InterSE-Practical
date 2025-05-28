import { FaCartPlus } from "react-icons/fa6";

const HomeNav = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">Pizza Outlet</div>
          <div className="flex items-center space-x-6">
            <nav>
              <ul className="flex space-x-6">
                <li className="hover:text-blue-200 cursor-pointer transition-colors">Home</li>
                <li className="hover:text-blue-200 cursor-pointer transition-colors">Cart</li>
                <li className="hover:text-blue-200 cursor-pointer transition-colors">Order</li>
              </ul>
            </nav>
            <div className="relative">
              <FaCartPlus className="w-6 h-6 hover:text-blue-200 cursor-pointer transition-colors" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </div>
          </div>
        </div>
      </div>
      

    </div>
  )
}

export default HomeNav