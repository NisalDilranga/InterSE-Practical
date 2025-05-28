import React from "react";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  color = "text-blue-500",
}) => {
  const sizeClass = {
    small: "h-6 w-6",
    medium: "h-12 w-12",
    large: "h-20 w-20",
  }[size];

  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 ${color} ${sizeClass}`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
