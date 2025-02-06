"use client";

import Link from "next/link";
import { useAuth } from "@/app/presentation/context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="shadow-md bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-gray-300">EventManager</Link>
        <ul className="hidden md:flex space-x-6">
          <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
          <li><Link href="/presentation/pages/events" className="hover:text-gray-300">Events</Link></li>
          <li><Link href="/calendar" className="hover:text-gray-300">Calendar</Link></li>

          {isAuthenticated ? (
            <li className="relative group">
              <FaUserCircle size={28} className="cursor-pointer" />
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-md opacity-0 group-hover:opacity-100 transition">
                <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded-md transition">
                  Logout
                </button>
              </div>
            </li>
          ) : (
            <>
              <li><Link href="/presentation/pages/registration" className="bg-white font-size-xl font-semibold text-black p-2 rounded-lg hover:animate-pulse">Sign up</Link></li>
              <li><Link href="/presentation/pages/login" className="hover:text-gray-300">Sign in</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
