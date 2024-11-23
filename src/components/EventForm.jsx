import { useState } from "react";
import PropTypes from "prop-types";
import DateTimePicker from "./DateTimePicker";

const EventForm = ({ onAddTimer, errorMessage }) => {
  const [eventTitle, setEventTitle] = useState("");
  const [targetDateTime, setTargetDateTime] = useState({ date: "", time: "" });

  const handleSubmit = () => {
    onAddTimer(eventTitle, targetDateTime);
    setEventTitle("");
    setTargetDateTime({ date: "", time: "" });
  };

  return (
    <div>
      <div className="mb-6">
        <label className="block text-gray-800 dark:text-gray-200 mb-2">
          Event Title:
        </label>
        <input
          type="text"
          className="border rounded p-2 w-full dark:bg-gray-700 dark:text-gray-200"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />
      </div>

      <DateTimePicker
        targetDateTime={targetDateTime}
        setTargetDateTime={setTargetDateTime}
      />

      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

      <button
        onClick={handleSubmit}
        className="bg-blue-500 dark:bg-blue-700 text-white py-2 px-6 mt-4 rounded-lg shadow-md hover:bg-blue-600 dark:hover:bg-blue-800 transition"
      >
        Add Timer
      </button>
    </div>
  );
};

EventForm.propTypes = {
  onAddTimer: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default EventForm;
