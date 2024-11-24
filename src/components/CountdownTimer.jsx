import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CountdownTimer = ({ time, theme, onEnd, nextTimer, holiday }) => {
  const [secondsLeft, setSecondsLeft] = useState(time);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isActive && secondsLeft > 0) {
      const interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (secondsLeft === 0) {
      setIsActive(false);
      onEnd();

      if (nextTimer) {
        setSecondsLeft(nextTimer);
        setIsActive(true);
      }
    }
  }, [isActive, secondsLeft, onEnd, nextTimer]);

  useEffect(() => {
    setIsActive(true);
  }, []);

  // Utility to format time as days, hours, minutes, and seconds
  const formatTime = () => {
    const days = Math.floor(secondsLeft / (24 * 3600));
    const hours = Math.floor((secondsLeft % (24 * 3600)) / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const seconds = secondsLeft % 60;

    return `${days} Days : ${hours
      .toString()
      .padStart(2, "0")} Hours : ${minutes
      .toString()
      .padStart(2, "0")} Minutes : ${seconds
      .toString()
      .padStart(2, "0")} Seconds`;
  };

  return (
    <div
      onClick={() => navigate(`/holiday/${holiday.toLowerCase()}`)}
      className={`timer ${theme} p-8 rounded-lg text-center bg-gray-100 dark:bg-gray-900 shadow-lg transform transition hover:scale-105 cursor-pointer`}
    >
      <h1 className="text-4xl font-extrabold text-neonPink dark:text-neonBlue animate-fade">
        {formatTime()}
      </h1>
      {secondsLeft > 0 ? (
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
          Countdown in progress...
        </p>
      ) : (
        <p className="text-lg text-neonGreen dark:text-limeGreen mt-4 animate-fade">
          {`Time's up!`}
        </p>
      )}
    </div>
  );
};

CountdownTimer.propTypes = {
  time: PropTypes.number.isRequired,
  theme: PropTypes.string.isRequired,
  onEnd: PropTypes.func.isRequired,
  nextTimer: PropTypes.number, // Time in seconds for the next timer
  holiday: PropTypes.string.isRequired, // Name of the holiday
};

export default CountdownTimer;
