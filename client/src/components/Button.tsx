import React from "react";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled, isLoading, text }) => {
  return (
    <button onClick={onClick} disabled={disabled}
      className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${
        disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-lg"}`}>
      {isLoading ? "Uploading..." : text}
    </button>
  );
};

export default Button;
