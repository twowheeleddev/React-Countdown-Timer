import { useState } from "react";
import PropTypes from "prop-types";
import DateTimePicker from "./DateTimePicker";

const categories = ["cooking", "fitness", "sports", "study", "default"]; // Predefined categories

const EventForm = ({ onAddTimer, errorMessage }) => {
  const [eventTitle, setEventTitle] = useState("");
  const [targetDateTime, setTargetDateTime] = useState({ date: "", time: "" });
  const [category, setCategory] = useState(""); // New category state
  const [formError, setFormError] = useState("");

  const validateForm = () => {
    const { date, time } = targetDateTime;

    if (!eventTitle || !date || !time || !category) {
      setFormError("Please complete all fields, including category.");
      return false;
    }

    setFormError("");
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onAddTimer(eventTitle, targetDateTime, category);
      setEventTitle("");
      setTargetDateTime({ date: "", time: "" });
      setCategory("");
    }
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
          placeholder="Enter event title"
        />
      </div>

      <DateTimePicker
        targetDateTime={targetDateTime}
        setTargetDateTime={setTargetDateTime}
      />

      <div className="mb-6">
        <label className="block text-gray-800 dark:text-gray-200 mb-2">
          Category:
        </label>
        <select
          className="border rounded p-2 w-full dark:bg-gray-700 dark:text-gray-200"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}{" "}
              {/* Capitalize category names */}
            </option>
          ))}
        </select>
      </div>

      {formError && <p className="text-red-500 mt-2">{formError}</p>}
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
