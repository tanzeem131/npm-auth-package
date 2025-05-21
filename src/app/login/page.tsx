"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ENDPOINTS } from "@/common/api.endpoints";
import TextInput from "@/components/textInput/textInput";
import Button from "@/components/button/authButton";
// import { useForm } from "react-hook-form";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(ENDPOINTS.loginApi, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        setIsLoading(false);
        router.push("/admin");
      } else {
        setIsLoading(false);
        setError(data.message);
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
          <div className="rounded-xl p-8 backdrop-blur-sm bg-black !border-1 !border-white/20 shadow-lg">
            <div className="text-center mb-8">
              <p className="text-3xl font-bold text-white">Welcome</p>
              <p className="text-white font-bold text-xl tracking-tight">
                App with<span className="text-amber-600">Auth</span>
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
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
                  forgotPasswordLink="/forget-password"
                />
              </div>
              <Button
                isLoading={isLoading}
                type="submit"
                disabled={isLoading}
                processingtext="Logging..."
                btnname="Log in"
              />
            </form>
            {error && <p className="mt-2 text-red-600">{error}</p>}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium !text-[#0095ff] hover:!text-[#0080ff]"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
