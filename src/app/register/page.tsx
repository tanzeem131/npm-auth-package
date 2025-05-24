"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { setGlobalEmail } from "@/common/constants";
import { ENDPOINTS } from "@/common/api.endpoints";
import TextInput from "@/components/textInput/textInput";
import Button from "@/components/button/authButton";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

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
                <TextInput
                  id="firstName"
                  name="firstName"
                  type="text"
                  required={true}
                  value={firstName}
                  placeholder="Enter First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  label="First Name"
                />
                <TextInput
                  id="lastName"
                  name="lastName"
                  type="text"
                  required={true}
                  value={lastName}
                  placeholder="Enter Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                  label="Last Name"
                />
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
                  showTogglePassword
                />
              </div>
              <Button
                isLoading={isLoading}
                type="submit"
                disabled={isLoading}
                processingtext="Signing up..."
                btnname="Sign Up"
              />
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
