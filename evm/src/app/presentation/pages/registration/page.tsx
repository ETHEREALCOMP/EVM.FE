"use client";

import React, {useState} from "react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    userName: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if(user.password !== user.confirmPassword){
      setError("Wrong password");
      return;
    }

    try {
      const response = await fetch("https://localhost:7034/identity/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: user.userName,
          name: user.name,
          email: user.email,
          password: user.password,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Registration failed");
      }

      const data = await response.json();
      console.log("Registration successful", data);
  
      router.push("/presentation/pages/login");
    } catch (error: any) {
      setError(error.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl text-gray-800 font-bold mb-4 text-center">Sign up</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label className="block text-sm text-gray-700 font-medium">User Name:</label>
            <input
              type="text"
              name="userName"
              value={user.userName}
              onChange={handleChange}
              className="w-full text-gray-700 px-3 py-2 border border-gray-500 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 font-medium">Name:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full text-gray-700 px-3 py-2 border border-gray-500 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full text-gray-700 px-3 py-2 border border-gray-500 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 font-medium">Password:</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full text-gray-700 px-3 py-2 border border-gray-500 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 font-medium">Confirm password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              className="w-full text-gray-700 px-3 py-2 border border-gray-500 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Registration
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account? <a href="/presentation/pages/login" className="text-blue-500">Login</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;