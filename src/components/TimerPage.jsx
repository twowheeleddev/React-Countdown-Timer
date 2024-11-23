import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import CountdownTimer from "./CountdownTimer";

const TimerPage = ({ timers }) => {
  const { id } = useParams();
  const timer = timers.find((t) => t.id.toString() === id);

  if (!timer) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Timer Not Found
        </h2>
        <Link
          to="/"
          className="mt-4 bg-blue-500 dark:bg-blue-700 text-white py-2 px-4 rounded shadow-md hover:bg-blue-600 dark:hover:bg-blue-800 inline-block"
        >
          Go Back to Timers
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        {timer.title}
      </h2>
      <CountdownTimer
        time={timer.time}
        theme="bg-yellow-200 dark:bg-yellow-500 text-gray-800 dark:text-gray-900"
        onEnd={() => {}}
      />
      <Link
        to="/"
        className="mt-4 bg-blue-500 dark:bg-blue-700 text-white py-2 px-4 rounded shadow-md hover:bg-blue-600 dark:hover:bg-blue-800 inline-block"
      >
        Back to All Timers
      </Link>
    </div>
  );
};

TimerPage.propTypes = {
  timers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TimerPage;
