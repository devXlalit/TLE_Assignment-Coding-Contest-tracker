import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage or use system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Toggle theme function
  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  // Apply theme on mount and change
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="relative flex items-center justify-between py-3 px-2 md:px-10  shadow-2xl  font-medium ">
      <span className="font-bold text-2xl">Logo</span>
      <ul className="flex gap-4 md:gap-6 items-center">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-400 underline" : "hover:text-blue-300"
            }
          >
            Contest
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/past-contests"
            className={({ isActive }) =>
              isActive ? "text-blue-400 underline" : "hover:text-blue-300"
            }
          >
            Past Contests
          </NavLink>
        </li>

        {/* Dark Mode Toggle */}
        <li>
          <button
            onClick={toggleTheme}
            className="text-2xl p-2 rounded-full  transition-all"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
        </li>

        {/* Profile Dropdown */}
        <li className="relative ">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <img
              className="h-10 rounded-full cursor-pointer"
              src="https://cdn-icons-png.flaticon.com/512/6858/6858504.png"
              alt="profile"
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-40   shadow-lg rounded-lg overflow-hidden">
              <NavLink
                to="/bookmarks"
                className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Bookmark
              </NavLink>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => {
                  setIsOpen(false);
                  alert("Logged out!"); // Replace with actual logout logic
                }}
              >
                Logout
              </button>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
