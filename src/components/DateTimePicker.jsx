import PropTypes from "prop-types";

const DateTimePicker = ({ targetDateTime, setTargetDateTime }) => {
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setTargetDateTime((prev) => ({
      ...prev,
      date: selectedDate,
    }));
  };

  const handleTimeChange = (event) => {
    const selectedTime = event.target.value;
    setTargetDateTime((prev) => ({
      ...prev,
      time: selectedTime,
    }));
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-800 dark:text-gray-200 mb-2">
          Select Date:
        </label>
        <input
          type="date"
          value={targetDateTime.date || ""}
          className="border rounded p-2 w-full dark:bg-gray-700 dark:text-gray-200"
          onChange={handleDateChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 dark:text-gray-200 mb-2">
          Select Time:
        </label>
        <input
          type="time"
          value={targetDateTime.time || ""}
          className="border rounded p-2 w-full dark:bg-gray-700 dark:text-gray-200"
          onChange={handleTimeChange}
        />
      </div>
    </div>
  );
};

DateTimePicker.propTypes = {
  targetDateTime: PropTypes.shape({
    date: PropTypes.string,
    time: PropTypes.string,
  }).isRequired,
  setTargetDateTime: PropTypes.func.isRequired,
};

export default DateTimePicker;
