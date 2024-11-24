import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AppWrapper = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = window.localStorage.getItem("theme");
    return savedTheme
      ? savedTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Toggle dark mode and store preference in localStorage
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      window.localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="app-wrapper min-h-screen w-full flex flex-col bg-gray-100 dark:bg-gray-900 px-4 md:px-8 lg:px-16">
      {/* Header */}
      <header className="flex items-center justify-between w-full py-4 max-w-6xl mx-auto animate-fade">
        {/* App Title Link to Home */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-neonPink dark:text-neonBlue hover:underline"
        >
          Count-Down-App
        </Link>

        {/* Links and Dark Mode Toggle */}
        <div className="flex items-center space-x-4">
          {/* Link to Timers Page */}
          <Link
            to="/timers"
            className="text-lg font-medium text-gray-900 dark:text-gray-200 hover:text-electricBlue dark:hover:text-cyan transition"
          >
            Active Timers
          </Link>

          {/* Link to Custom Holidays Page */}
          <Link
            to="/custom-holidays"
            className="text-lg font-medium text-gray-900 dark:text-gray-200 hover:text-electricBlue dark:hover:text-cyan transition"
          >
            Custom Holidays
          </Link>

          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="bg-neonGreen dark:bg-neonPurple text-white py-2 px-4 rounded-lg shadow-md hover:bg-limeGreen dark:hover:bg-electricBlue transition transform hover:scale-105 focus:ring focus:ring-electricBlue"
            aria-label="Toggle dark mode"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-6xl mx-auto">
        <div className="prose dark:prose-invert text-center">{children}</div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-sm text-gray-700 dark:text-gray-400">
        Built with ❤️ and TailwindCSS By:{" "}
        <a
          href="https://github.com/twowheeleddev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neonPink dark:text-neonBlue hover:underline"
        >
          Douglas Green
        </a>
      </footer>
    </div>
  );
};

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppWrapper;
