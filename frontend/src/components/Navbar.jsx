import React, { useState, useEffect, useRef } from "react";
import {
  User,
  Code,
  LogOut,
  Folder,
  Search,
  Sun,
  Moon,
  Trophy,
  Flame,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useProblemStore } from "../store/useProblemStore";
import { axiosInstance } from "../lib/axios.js";
const Navbar = () => {
  const { authUser } = useAuthStore();
  const [darkMode, setDarkMode] = useState(true);
  const [dailyChallenge, setDailyChallenge] = useState(null);
  const { problems, isProblemsLoading, getAllProblems } = useProblemStore();

  useEffect(() => {
    if (!authUser) return;
    // Defer to idle time to avoid blocking render
    window.requestIdleCallback(() => {
      getAllProblems();
    });
  }, [authUser, getAllProblems]);

  useEffect(() => {
    const fetchDailyChallenge = async () => {
      try {
        const res = await axiosInstance.get("/challenge/daily");

        const data = res.data;

        setDailyChallenge({
          title: data.title,
          link: `/problem/${data.id}`,
        });
      } catch (error) {
        console.error("Error fetching daily challenge", error);
      }
    };

    fetchDailyChallenge();
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
      setDarkMode(savedTheme === "dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    const theme = newTheme ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", theme);

    localStorage.setItem("theme", theme);
  };

  return (
    <nav className="sticky  w-full shrink-0 top-0 z-50 flex flex-wrap gap-15 items-center justify-between bg-primary/10 ">
      <div className="flex flex-row  shrink-0 w-full justify-between  items-center px-6 py-4 bg-black/15 shadow-lg shadow-neutral-600/5 backdrop-blur-lg border border-gray-200/10">
        {/* Logo Section */}
        <div className="flex shrink-0 items-center flex-1">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/leetlab.svg"
              loading="lazy"
              decoding="async"
              className="h-12 w-12 bg-primary/10 rounded-full px-2 "
              alt="LeetLab Logo"
            />
            <span className="text-lg bg-primary/20 shadow-md rounded-xl px-4 py-1 text-white md:text-2xl font-bold tracking-tight hidden md:block">
              LeetLab
            </span>
          </Link>
        </div>

        {/* Daily Challenge */}
        <div className="  md:flex items-center shrink-0 text-center align-center justify-center">
          <div className="hidden md:flex flex-1 items-center gap-2 bg-primary/30 text-white px-4 py-2 rounded-lg shadow-md ">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <p className="text-sm font-semibold">Daily Challenge:</p>
            {dailyChallenge ? (
              <>
                <Link
                  to={dailyChallenge.link}
                  className="text-white font-bold hover:underline"
                >
                  {dailyChallenge.title}
                </Link>
              </>
            ) : (
              <span className="text-sm text-semibold px-4">
                Loading challenge
              </span>
            )}
          </div>
        </div>

        {/* Actions & User Dropdown */}
        <div className="flex-1 flex items-center justify-end gap-6">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="btn btn-circle btn-ghost hover:bg-primary/20"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 border-white-400" />
            ) : (
              <Moon className="w-5 h-5 bg-amber-400-300" />
            )}
          </button>

          {/* User Profile Dropdown */}
          <div className="flex items-center gap-8">
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar flex flex-row "
              >
                <div className="w-10 h-10 rounded-full ">
                  <img
                    src={
                      authUser?.image ||
                      "https://avatar.iran.liara.run/public/boy"
                    }
                    alt="User Avatar"
                    className="object-cover"
                    width={48}
                    height={48}
                    loading="lazy"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-3"
              >
                <li>
                  <p className="text-base font-semibold">{authUser?.name}</p>
                  <hr className="border-gray-200/10" />
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="hover:bg-primary hover:text-white text-base font-semibold"
                  >
                    <User className="w-4 h-4 mr-2" />
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/submissions"
                    className="hover:bg-primary hover:text-white text-base font-semibold"
                  >
                    <Folder className="w-4 h-4 mr-2" />
                    Submissions
                  </Link>
                </li>
                {authUser?.role === "ADMIN" && (
                  <li>
                    <Link
                      to="/add-problem"
                      className="hover:bg-primary hover:text-white text-base font-semibold"
                    >
                      <Code className="w-4 h-4 mr-1 pr-1" />
                      Add Problem
                    </Link>
                  </li>
                )}
                <li>
                  <LogoutButton className="hover:bg-primary hover:text-white">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </LogoutButton>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
