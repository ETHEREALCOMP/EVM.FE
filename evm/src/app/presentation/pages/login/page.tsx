"use client";

import {useState} from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  
    //example, replace with database validation or api
    if (email === "admin@gmail.com" && password === "123456") {
      router.push("/");
    } else {
      setError("Wrong email or password");
    }
    //
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl text-gray-800 font-bold mb-4 text-center">Sign in</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 font-medium">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-gray-700 px-3 py-2 border border-gray-500 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 font-medium">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-gray-700 px-3 py-2 border border-gray-500 rounded-md"
              required
            />
          </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
        </form>
      </div>
    </div>
  );
};
  
export default LoginPage;