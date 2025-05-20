"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setGlobalEmail } from "@/common/constants";
import { ENDPOINTS } from "@/common/api.endpoints";

export default function ForgetPassword() {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<String>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLinkSend, setIsLinkSend] = useState<boolean>(false);
  const router = useRouter();

  const handleForgetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(ENDPOINTS.forgetPassword, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setGlobalEmail(email);
        setIsLoading(false);
        setIsLinkSend(true);
      } else {
        setError(data.error || "Registration failed");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-xl !p-2 !backdrop-blur-sm !bg-black !border-1 !border-white/20 shadow-lg">
            {isLinkSend ? (
              <div className="text-center mb-8">
                <p className="text-white font-bold text-xl tracking-tight">
                  App with<span className="text-amber-600">Auth</span>
                </p>
                <p className="text-xl font-bold text-white">
                  Password Reset link is sent to your mail
                </p>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <p className="text-3xl font-bold text-white">
                    Forget Password
                  </p>
                  <p className="text-white font-bold text-xl tracking-tight">
                    App with<span className="text-amber-600">Auth</span>
                  </p>
                </div>
                <form className="space-y-6" onSubmit={handleForgetPassword}>
                  <div className="space-y-4">
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
                        placeholder="Enter your email to get link"
                      />
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
                          Sending Link...
                        </span>
                      ) : (
                        "Get Link"
                      )}
                    </button>
                  </div>
                </form>
                {error && <p className="mt-2 text-red-600">{error}</p>}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
