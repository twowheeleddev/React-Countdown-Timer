import PropTypes from "prop-types";
import {useEffect, useState} from "react";

const CountdownTimer = ({time, theme, onEnd}) => {
  const [secondsLeft, setSecondsLeft] = useState(time);
  const [isActive, setIsActive] = useState(false);

  // Start or stop the timer based on the isActive state variable
  useEffect(() => {
    if (isActive && secondsLeft > 0) {
      const interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (secondsLeft === 0) {
      setIsActive(false);
      onEnd();
    }
  }, [isActive, secondsLeft, onEnd]);

  // Utility to format time displayed
  const formatTime = () => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}`;
  };

  return (
    <div className={`timer ${theme} p-4 rounded-lg text-center`}>
      <h1 className="text-5xl font-bold">{formatTime()}</h1>
    </div>
  );
};
//** DEFINING PROP-TYPES FOR THE COUNTDOWNTIMER COMPONENT */
CountdownTimer.propTypes = {
  time: PropTypes.number.isRequired,
  theme: PropTypes.string.isRequired,
  onEnd: PropTypes.func.isRequired,
};

export default CountdownTimer;
