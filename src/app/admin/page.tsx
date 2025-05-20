// app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ENDPOINTS } from "@/common/api.endpoints";
import Link from "next/link";

export default function AdminPage() {
  const [title, setTitle] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [experience, setExperience] = useState(0);
  const [salary, setSalary] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [jobLink, setJobLink] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch(ENDPOINTS.postJobs, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        company,
        experience,
        salary,
        description,
        jobLink,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage(`Job created! View it at /job/${data._id}`);
      // Clear form
      setTitle("");
      setCompany("");
      setExperience(0);
      setSalary("");
      setDescription("");
      setJobLink("");
    } else {
      setMessage(`Error: ${data.message}`);
    }
  };

  return (
    <div className="min-h-[900px] bg-gray-900 text-white flex flex-col">
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-xl !p-2 !backdrop-blur-sm !bg-black !border-1 !border-white/20 shadow-lg">
            <div className="text-center mb-8">
              <p className="text-3xl font-bold text-white">
                Create Job Posting
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full !px-4 !py-2 !bg-gray-700/20 !border !border-gray-400/10 !rounded-lg !text-[#edeef0] focus:outline-none"
                    placeholder="Job Title"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full !px-4 !py-2 !bg-gray-700/20 !border !border-gray-400/10 !rounded-lg !text-[#edeef0] focus:outline-none"
                    placeholder="Company Name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Experience
                  </label>
                  <input
                    id="experience"
                    name="experience"
                    type="number"
                    required
                    value={experience}
                    onChange={(e) => setExperience(Number(e.target.value))}
                    className="w-full !px-4 !py-2 !bg-gray-700/20 !border !border-gray-400/10 !rounded-lg !text-[#edeef0] focus:outline-none"
                    placeholder="Experience (in years)"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Salary
                  </label>
                  <input
                    id="salary"
                    name="salary"
                    type="text"
                    required
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full !px-4 !py-2 !bg-gray-700/20 !border !border-gray-400/10 !rounded-lg !text-[#edeef0] focus:outline-none"
                    placeholder="Salary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Job Link
                  </label>
                  <input
                    id="jobLink"
                    name="jobLink"
                    type="url"
                    required
                    value={jobLink}
                    onChange={(e) => setJobLink(e.target.value)}
                    className="w-full !px-4 !py-2 !bg-gray-700/20 !border !border-gray-400/10 !rounded-lg !text-[#edeef0] focus:outline-none"
                    placeholder="External Apply Link"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full !px-4 !py-2 !bg-gray-700/20 !border !border-gray-400/10 !rounded-lg !text-[#edeef0] focus:outline-none"
                    placeholder="Job description"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full cursor-pointer flex justify-center !py-3 !px-4 !rounded-md font-semibold text-white transition-all duration-300 bg-blue-600 bg-gradient-to-r from-blue-600 to-blue-400 hover:shadow-lg hover:shadow-blue-600/30"
                >
                  Create Job
                </button>
              </div>
            </form>
            {message && <p className="mt-4 text-center">{message}</p>}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Go to
                <Link
                  href="/job"
                  className="font-medium !text-[#0095ff] hover:!text-[#0080ff]"
                >
                  home ➡️
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
