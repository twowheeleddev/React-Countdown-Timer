import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import CountdownTimer from "./CountdownTimer";
import { cooking, fitness, sports, study, defaultImage } from "../images/index";

const TimerBackgrounds = {
  cooking,
  fitness,
  sports,
  study,
  default: defaultImage,
};

const TimerPage = ({ timers }) => {
  const { id } = useParams();
  const timer = timers.find((t) => t.id.toString() === id);

  const [timeRemaining, setTimeRemaining] = useState(timer ? timer.time : 0);

  // Handle countdown timer
  useEffect(() => {
    if (timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  // Check if timer exists
  if (!timer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Timer Not Found
        </h1>
        <Link
          to="/timers"
          className="mt-4 bg-blue-500 dark:bg-blue-700 text-white py-2 px-4 rounded shadow hover:bg-blue-600 dark:hover:bg-blue-800"
        >
          Back to All Timers
        </Link>
      </div>
    );
  }

  // Determine background image
  const backgroundImage =
    TimerBackgrounds[timer.category] || TimerBackgrounds.default;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Fullscreen Background Image */}
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {/* Timer Content */}
      <div className="relative z-10 w-full max-w-3xl p-6 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          {timer.title}
        </h2>

        <div className="flex flex-col items-center mb-4">
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Time Remaining:
          </p>
          <CountdownTimer
            time={timeRemaining}
            theme="bg-yellow-200 dark:bg-yellow-500 text-gray-800 dark:text-gray-900"
            onEnd={() => setTimeRemaining(0)}
          />
        </div>

        <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
          Category:{" "}
          <span className="font-bold capitalize">
            {timer.category || "Uncategorized"}
          </span>
        </p>

        <Link
          to="/timers"
          className="bg-blue-500 dark:bg-blue-700 text-white py-2 px-6 rounded shadow-md hover:bg-blue-600 dark:hover:bg-blue-800 transition"
        >
          Back to All Timers
        </Link>
      </div>
    </div>
  );
};

TimerPage.propTypes = {
  timers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
      category: PropTypes.string,
    })
  ).isRequired,
};

export default TimerPage;
