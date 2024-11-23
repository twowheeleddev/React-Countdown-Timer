import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CountdownTimer from "./CountdownTimer";

const TimerList = ({ timers, onTimerEnd }) => {
  return (
    timers.length > 0 && (
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Active Timers
        </h2>
        <ul className="space-y-4">
          {timers.map((timer) => (
            <li
              key={timer.id}
              className="relative bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200 rounded p-4 shadow-lg"
            >
              <h3 className="text-lg font-bold">{timer.title}</h3>
              <CountdownTimer
                time={timer.time}
                theme="bg-yellow-200 dark:bg-yellow-500 text-gray-800 dark:text-gray-900"
                onEnd={() => onTimerEnd(timer.id)}
              />
              <Link
                to={`/timer/${timer.id}`}
                className="mt-2 bg-blue-500 dark:bg-blue-700 text-white py-1 px-3 rounded shadow-md hover:bg-blue-600 dark:hover:bg-blue-800 inline-block"
              >
                View Timer
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

TimerList.propTypes = {
  timers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
    })
  ).isRequired,
  onTimerEnd: PropTypes.func.isRequired,
};

export default TimerList;
