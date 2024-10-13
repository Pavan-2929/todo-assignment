import React from "react";
import toast from "react-hot-toast";
import { FaBars, FaHamburger, FaRegComment, FaUsers } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("todos");

    toast.success("You have logged out");

    navigate("/sign-up");
  };

  return (
    <div className=" relative">
      {/* Desktop Sidebar */}
      <div className="min-w-[15vw] bg-gray-100 px-12 min-h-screen space-y-4 text-gray-500 pt-6 md:inline-block hidden">
        <div className="flex items-center gap-x-3 text-lg font-semibold hover:cursor-not-allowed">
          <MdOutlinePostAdd className="size-6 " />
          Post
        </div>
        <div className="flex items-center gap-x-3 text-lg font-semibold hover:cursor-not-allowed">
          <FaRegComment />
          Comments
        </div>
        <div className="flex items-center gap-x-3 text-lg font-semibold hover:cursor-not-allowed">
          <FaBars />
          Tags
        </div>
        <div
          onClick={handleLogOut}
          className="flex items-center gap-x-3 text-lg font-semibold cursor-pointer hover:text-blue-500"
        >
          <FaUsers />
          Logout
        </div>
        <div>@{user.username}</div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 w-full bg-gray-100 flex justify-around items-center py-2 shadow-md">
        <div className="flex flex-col items-center">
          <MdOutlinePostAdd className="text-xl" />
        </div>
        <div className="flex flex-col items-center">
          <FaRegComment className="text-xl" />
        </div>
        <div className="flex flex-col items-center">
          <FaBars className="text-xl" />
        </div>
        <div
          onClick={handleLogOut}
          className="flex flex-col items-center cursor-pointer"
        >
          <FaUsers className="text-xl" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
