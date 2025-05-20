import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

type TextInputProps = {
  id: string;
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  autoComplete: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  showTogglePassword?: boolean;
  forgotPasswordLink?: string;
};

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  autoComplete,
  onChange,
  required = false,
  showTogglePassword = false,
  forgotPasswordLink,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordType = type === "password";

  const inputType =
    showTogglePassword && isPasswordType
      ? showPassword
        ? "text"
        : "password"
      : type;

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-300"
        >
          {label}
        </label>
        {forgotPasswordLink && (
          <Link
            href={forgotPasswordLink}
            className="text-sm !text-[#0095ff] hover:!text-[#0080ff]"
          >
            Forgot password?
          </Link>
        )}
      </div>

      <div className="flex items-center relative">
        <input
          id={id}
          name={name}
          type={inputType}
          required={required}
          value={value}
          onChange={onChange}
          className="w-full !px-4 !py-2 !bg-gray-700/20 !border !border-gray-400/10 !rounded-lg !text-[#edeef0] focus:outline-none"
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        {showTogglePassword && isPasswordType && (
          <button
            type="button"
            className="absolute right-3 text-gray-400 hover:text-gray-200"
            onClick={toggleShowPassword}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default TextInput;
