import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [agreedTerms, setAgreedTerms] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    const localStorageUser = JSON.parse(localStorage.getItem("user"));

    if (!localStorageUser) {
      toast.error("User not found in local storage. Please sign up first.");
      return;
    }

    if (
      localStorageUser.email === user.email &&
      localStorageUser.password === user.password
    ) {
      localStorage.setItem("token", "authenticated");
      toast.success("SignIn Successful");
      navigate("/");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center">
      <div className="bg-gray-100 text-black px-12 py-10 rounded-lg shadow-md w-full max-w-md">
        <div className="text-4xl text-center text-gray-800 pb-6 font-bold">
          <h1>Sign In</h1>
        </div>
        <form onSubmit={handleSignIn}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold  mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              onChange={handleChange}
              value={user.email}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold  mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              value={user.password}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center mb-6">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="font-semibold text-gray-700">
              Remember Me
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
        <a
          href="#"
          className="text-sm flex justify-end mt-4 text-gray-600 font-semibold hover:underline"
        >
          Forgot <span className="text-blue-500 ml-1"> Password?</span>
        </a>
        <div className="text-center mt-6">
          <p>
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
