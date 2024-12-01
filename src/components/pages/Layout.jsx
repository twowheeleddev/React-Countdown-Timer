import { FiHome, FiMoon, FiSun } from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const Layout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync dark mode with the user's system or saved preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Navbar */}
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* App Title for Larger Screens */}
          <Link
            to="/"
            className="hidden sm:block text-2xl font-bold tracking-wide text-gray-900 dark:text-gray-100"
          >
            Countdown Timer App
          </Link>
          {/* Home Icon for Mobile Screens */}
          <Link
            to="/"
            className="block sm:hidden text-gray-900 dark:text-gray-100"
          >
            <FiHome size={24} />
          </Link>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex items-center bg-blue-500 dark:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 dark:hover:bg-blue-800 transition duration-200"
          >
            {isDarkMode ? (
              <FiSun className="mr-2" />
            ) : (
              <FiMoon className="mr-2" />
            )}
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 md:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 dark:bg-gray-800 text-center py-4">
        <p className="text-sm sm:text-base">
          © 2024 Countdown Timer App. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
