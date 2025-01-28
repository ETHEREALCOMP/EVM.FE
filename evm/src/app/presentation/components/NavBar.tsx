import Link from "next/link";

const Navbar = () => (
  <nav className="shadow-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            {/* logo */}
            <a
              href="/"
              className="text-2xl font-bold text-white-600 hover:text-gray-200"
            >
              EventManager
            </a>

            {/* navigation */}
            <ul className="hidden md:flex space-x-6">
              <li>
                <a
                  href="/"
                  className="text-white-700 hover:text-gray-300 transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/presentation/pages/events"
                  className="text-white-700 hover:text-gray-300 transition"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="/calendar"
                  className="text-white-700 hover:text-gray-300 transition"
                >
                  Calendar
                </a>
              </li>
              <li>
                <a
                  href="/analytics"
                  className="text-white-700 hover:text-gray-300 transition"
                >
                  Analytics
                </a>
              </li>
            </ul>

            {/* mobile phone button */}
            <button className="md:hidden text-gray-500">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </nav>
);

export default Navbar;