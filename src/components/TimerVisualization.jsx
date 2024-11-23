import PropTypes from "prop-types";

const TimerVisualization = ({ time }) => {
  const calculateProgress = () => {
    const totalTime = time + 1; // Add 1 to account for real-time ticking
    const remaining = time;
    return ((totalTime - remaining) / totalTime) * 100;
  };

  return (
    <div className="relative">
      <svg
        className="w-32 h-32"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="text-gray-300 dark:text-gray-600"
          stroke="currentColor"
          strokeWidth="2"
          fill="transparent"
          r="16"
          cx="18"
          cy="18"
        />
        <circle
          className="text-blue-500 dark:text-blue-400"
          stroke="currentColor"
          strokeWidth="2"
          fill="transparent"
          strokeDasharray="100"
          strokeDashoffset={100 - calculateProgress()}
          r="16"
          cx="18"
          cy="18"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
        {time}s
      </div>
    </div>
  );
};

TimerVisualization.propTypes = {
  time: PropTypes.number.isRequired,
};

export default TimerVisualization;
