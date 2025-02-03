import React from "react";
import { useUserStore } from "../store/useUserStore";
import { Link } from "react-router-dom";

const Navbar = () => {
 
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
   
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto max-w-screen-xl flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-gray-200 transition">
          FAQ
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-4">
          {isAdmin && (
            // <Link to="/admin" >
              // Admin Dashboard
              <Link to="/faq/create" className="bg-green-500 px-4 py-2 rounded-md text-white hover:bg-red-700 transition">
                Add faq
              </Link>
            // </Link>
          )}

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold">
                {user.name} 
              </span>
              <button
                onClick={logout}
                className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="bg-green-500 px-4 py-2 rounded-md text-white hover:bg-green-700 transition"
              >
                Login
              </Link>
              <Link
                to="/singup"
                className="bg-yellow-500 px-4 py-2 rounded-md text-white hover:bg-yellow-700 transition"
              >
                SingUp
              </Link>
             
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
