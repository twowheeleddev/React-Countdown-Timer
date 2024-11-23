import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const CountdownTimer = ({ time, theme, onEnd }) => {
  const [secondsLeft, setSecondsLeft] = useState(time);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive && secondsLeft > 0) {
      const interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (secondsLeft === 0) {
      setIsActive(false);
      onEnd();
    }
  }, [isActive, secondsLeft, onEnd]);

  useEffect(() => {
    setIsActive(true);
  }, []);

  // Utility to format time as days, hours, minutes, and seconds
  const formatTime = () => {
    const days = Math.floor(secondsLeft / (24 * 3600));
    const hours = Math.floor((secondsLeft % (24 * 3600)) / 3600); // Only hours within a day (0-23)
    const minutes = Math.floor((secondsLeft % 3600) / 60); // Only minutes within an hour (0-59)
    const seconds = secondsLeft % 60; // Remaining seconds within a minute

    return `${days} Days : ${hours.toString().padStart(2, "0")} Hours : ${minutes
      .toString()
      .padStart(2, "0")} Minutes : ${seconds.toString().padStart(2, "0")} Seconds `;
  };

  return (
    <div className={`timer ${theme} p-6 rounded-lg text-center`}>
      <h1 className="text-3xl font-bold">{formatTime()}</h1>
    </div>
  );
};

CountdownTimer.propTypes = {
  time: PropTypes.number.isRequired,
  theme: PropTypes.string.isRequired,
  onEnd: PropTypes.func.isRequired,
};

export default CountdownTimer;
