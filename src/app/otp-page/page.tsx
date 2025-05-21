"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { globalEmail } from "@/common/constants";
import { ENDPOINTS } from "@/common/api.endpoints";
import TextInput from "@/components/textInput/textInput";
import Button from "@/components/button/authButton";

export default function OTPPage() {
  const [email] = useState<string | null>(globalEmail);
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(ENDPOINTS.verifyOTP, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
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
          <div className="rounded-xl !p-2 !backdrop-blur-sm !bg-black !border-1 !border-white/20 shadow-lg">
            <div className="text-center mb-8">
              <p className="text-3xl font-bold text-white">Verify OTP</p>
              <p className="mt-2 text-gray-400">
                We have send you an OTP to your mail.
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleOtp}>
              <div className="space-y-4">
                <TextInput
                  id="otp"
                  name="otp"
                  type="text"
                  autoComplete="one-time-code"
                  required={true}
                  value={otp}
                  placeholder="Enter your OTP"
                  onChange={(e) => setOtp(e.target.value)}
                  label="OTP"
                />
              </div>
              <Button
                isLoading={isLoading}
                type="submit"
                disabled={isLoading}
                processingtext="Verifying OTP..."
                btnname="Verify OTP"
              />
            </form>
            {error && <p className="mt-2 text-red-600">{error}</p>}
          </div>
        </div>
      </main>
    </div>
  );
}
