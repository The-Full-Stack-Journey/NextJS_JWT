"use client";
import { useState } from "react";


export default function Register() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch ("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            alert("User created successfully");
            setFormData({ fullName: "", email: "", password: "" });

        } catch (error: any) {
            setError(error.message);
        }finally {
            setLoading(false);
        }
    }

    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-center text-2xl font-semibold text-gray-700">
            Create an Account
          </h2>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                placeholder="Enter your full name"
                onChange={handleChange}
                name="fullName"
                required
                value={formData.fullName}
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                placeholder="Enter your email"
                onChange={handleChange}
                name="email"
                required
                value={formData.email}
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                placeholder="Enter your password"
                onChange={handleChange}
                name="password"
                required
                value={formData.password}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-500 px-4 py-3 text-white hover:bg-blue-600"
            >
              {loading ? "Registering..." : "Register"}
            </button>
            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account? <a href="/login" className="text-blue-500">Login</a>
            </p>
          </form>
        </div>
      </div>
    );
  }