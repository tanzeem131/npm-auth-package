"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setGlobalEmail } from "@/common/constants";
import { ENDPOINTS } from "@/common/api.endpoints";
import TextInput from "@/components/textInput/textInput";
import Button from "@/components/button/authButton";

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
                    <TextInput
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required={true}
                      value={email}
                      placeholder="john@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                      label="Email"
                    />
                  </div>
                  <Button
                    isLoading={isLoading}
                    type="submit"
                    disabled={isLoading}
                    processingtext="Sending Link..."
                    btnname="Get Link"
                  />
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
