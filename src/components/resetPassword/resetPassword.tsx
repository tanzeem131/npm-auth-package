"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ENDPOINTS } from "@/common/api.endpoints";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const toggleShowPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handlePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (password !== confirmPassword) {
        setError("Password not matched");
        return;
      }

      const res = await fetch(ENDPOINTS.resetPassword, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, email, token }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsLoading(false);
        router.push("/login");
      }
      setIsLoading(false);
      setError(data.error || "Login failed");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-xl p-8 backdrop-blur-sm bg-black !border-1 !border-white/20 shadow-lg">
            <div className="text-center mb-8">
              <p className="text-3xl font-bold text-white">Reset Password</p>
              <p className="text-white font-bold text-xl tracking-tight">
                App with<span className="text-amber-600">Auth</span>
              </p>
            </div>
            <form className="space-y-6" onSubmit={handlePassword}>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Set Password
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full !px-4 !py-2 !bg-gray-700/20 !border !border-gray-400/10 !rounded-lg !text-[#edeef0] focus:outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Confirm Password
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full !px-4 !py-2 !bg-gray-700/20 !border !border-gray-400/10 !rounded-lg !text-[#edeef0] focus:outline-none"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="hover:cursor-pointer"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full cursor-pointer flex justify-center !py-3 !px-4 !rounded-md font-semibold text-white transition-all duration-300 bg-blue-600 bg-gradient-to-r from-blue-600 to-blue-400 hover:shadow-lg hover:shadow-blue-600/30 ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      Password Resetting...
                    </span>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </div>
            </form>
            {error && <p className="mt-2 text-red-600">{error}</p>}
          </div>
        </div>
      </main>
    </div>
  );
}
