import React, { useState } from "react";

type BtnInputProps = {
  isLoading: boolean;
  disabled: boolean;
  type?: "submit" | "reset" | "button";
  name: string;
  btnname: string;
  processingtext: string;
  autoComplete: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput: React.FC<BtnInputProps> = ({
  isLoading,
  type,
  disabled,
  processingtext,
  btnname,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <button
        type={type}
        disabled={disabled}
        className={`w-full cursor-pointer flex justify-center !py-3 !px-4 !rounded-md font-semibold text-white transition-all duration-300 bg-blue-600 bg-gradient-to-r from-blue-600 to-blue-400 hover:shadow-lg hover:shadow-blue-600/30 ${
          isLoading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150">
              <path
                fill="none"
                stroke="#FF156D"
                stroke-width="15"
                stroke-linecap="round"
                stroke-dasharray="300 385"
                stroke-dashoffset="0"
                d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  calcMode="spline"
                  dur="2"
                  values="685;-685"
                  keySplines="0 0 1 1"
                  repeatCount="indefinite"
                ></animate>
              </path>
            </svg>
            {processingtext}...
          </span>
        ) : (
          btnname
        )}
      </button>
    </div>
  );
};

export default TextInput;
