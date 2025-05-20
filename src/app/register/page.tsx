"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { setGlobalEmail } from "@/common/constants";
import { ENDPOINTS } from "@/common/api.endpoints";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const toggleShowPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(ENDPOINTS.registerApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });

      const data = await res.json();

      if (res.ok) {
        await fetch(ENDPOINTS.generateOTP, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        setGlobalEmail(email);
        setIsLoading(false);
        router.push("/otp-page");
      } else {
        alert(data.error || "Registration failed");
        setIsLoading(false);
        setError(data.error || "Registration failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-[800px] bg-gray-900 text-white flex flex-col">
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-xl !p-2 !backdrop-blur-sm !bg-black !border-1 !border-white/20 shadow-lg">
            <div className="text-center mb-8">
              <p className="text-3xl font-bold text-white">Sign Up</p>
              <p className="text-white font-bold text-xl tracking-tight">
                App with<span className="text-amber-600">Auth</span>
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleRegister}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    First Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full !px-4 !py-2 !bg-gray-700/20 !border !border-gray-400/10 !rounded-lg !text-[#edeef0] focus:outline-none"
                    placeholder="Enter First Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full !px-4 !py-2 !bg-gray-700/20 !border !border-gray-400/10 !rounded-lg !text-[#edeef0] focus:outline-none"
                    placeholder="Enter Last Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full !px-4 !py-2 !bg-gray-700/20 !border !border-gray-400/10 !rounded-lg !text-[#edeef0] focus:outline-none"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Password
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                    <span className="flex items-center">Signing up...</span>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>
            </form>
            {error && <p className="mt-2 text-red-600">{error}</p>}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium !text-[#0095ff] hover:!text-[#0080ff]"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
