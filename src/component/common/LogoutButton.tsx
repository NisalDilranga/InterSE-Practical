import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";

interface LogoutButtonProps {
  className?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ className }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className={`text-red-600 hover:text-red-800 font-medium transition duration-150 ease-in-out ${
        className || ""
      }`}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
