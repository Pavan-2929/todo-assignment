import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaKey } from "react-icons/fa";
import SignUpImage from "../assets/Signup.png";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [agreedTerms, setAgreedTerms] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    if (user.password !== user.repeatPassword) {
      toast.error("Password and Confirm-Password should be same");
      return
    }

    if (!agreedTerms) {
      toast.error("You must agree to the terms and conditions.");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));

    toast.success("user registered locally, now you can signin");

    navigate("/sign-in");
  };

  console.log(agreedTerms);

  return (
    <div className="min-h-screen flex items-center justify-center px-0 lg:px-14 mx-auto">
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl w-full">
        <div className="bg-white text-black px-8 py-10 rounded-lg w-full lg:w-1/2 max-w-lg">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800">Sign Up</h1>
          </div>

          <form onSubmit={handleSignUp}>
            <div className="mb-4 flex items-center space-x-4">
              <FaUser className="text-gray-700 size-6" />
              <input
                type="text"
                id="username"
                onChange={handleChange}
                value={user.username}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="mb-4 flex items-center space-x-4">
              <FaEnvelope className="text-gray-700 size-6" />
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

            <div className="mb-4 flex items-center space-x-4">
              <FaLock className="text-gray-700 size-6" />
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

            <div className="mb-4 flex items-center space-x-4">
              <FaKey className="text-gray-700 size-6" />
              <input
                type="password"
                id="repeatPassword"
                onChange={handleChange}
                value={user.repeatPassword}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Repeat your password"
                required
              />
            </div>

            <div className="flex justify-center items-center space-x-2 mb-6">
              <input
                type="checkbox"
                name=""
                id=""
                onChange={(e) => setAgreedTerms(!agreedTerms)}
                value={agreedTerms}
              />
              <p className="text-gray-600 font-semibold">
                I agree all statements in{" "}
                <span className="text-blue-500">Terms of Services</span>
              </p>
            </div>

            <div className="flex justify-center w-fit mx-auto">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-8 uppercase rounded-md font-semibold hover:bg-blue-600 transition duration-300"
              >
                Register
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p>
              Already have an account?{" "}
              <Link to="/sign-in" className="text-blue-500 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden lg:block w-1/2 lg:ml-10">
          <img
            src={SignUpImage}
            alt="Sign Up"
            className="w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
