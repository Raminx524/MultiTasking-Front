import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/auth.context";

function Navbar() {
  const { user } = useUserContext();
  function toggleUserLink() {
    if (!user) {
      return (
        <>
          <Link
            to="/login"
            className="text-blue-900 border-b border-transparent hover:border-current"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="text-blue-900 border-b border-transparent hover:border-current"
          >
            Sign Up
          </Link>
        </>
      );
    }
    return (
      <>
        <Link
          to="/userProfile"
          className="text-blue-900 border-b rounded-full bg-blue-400 w-6 text-center border-transparent hover:border-current"
        >
          {user.username.charAt(0).toUpperCase()}
        </Link>
      </>
    );
  }
  return (
    <nav className="px-10 py-3  shadow-sm bg-white">
      <div className="flex justify-between max-w-7xl m-auto items-center">
        <Link to="/" className="text-blue-900">
          MultiTasking
        </Link>
        <div className="flex gap-4">
          <Link
            to="/"
            className="text-blue-900 border-b border-transparent hover:border-current"
          >
            Home
          </Link>
          <Link
            to="/task"
            className="text-blue-900 border-b border-transparent hover:border-current"
          >
            Tasks
          </Link>
          {toggleUserLink()}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
