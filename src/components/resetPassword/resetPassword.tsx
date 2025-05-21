"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ENDPOINTS } from "@/common/api.endpoints";
import TextInput from "../textInput/textInput";
import Button from "../button/authButton";

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

  const handlePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (password !== confirmPassword) {
        setError("Password not matched");
        setIsLoading(false);
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
                <TextInput
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <TextInput
                  id="password"
                  label="Confirm Password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  showTogglePassword
                />
              </div>
              <Button
                isLoading={isLoading}
                type="submit"
                disabled={isLoading}
                processingtext="Password Resetting..."
                btnname="Reset Password"
              />
            </form>
            {error && <p className="mt-2 text-red-600">{error}</p>}
          </div>
        </div>
      </main>
    </div>
  );
}
