import { useState } from "react";
import PropTypes from "prop-types";

const CustomHolidaysPage = ({ onAddCustomHoliday }) => {
  const [holidayName, setHolidayName] = useState("");
  const [holidayDate, setHolidayDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddHoliday = () => {
    if (!holidayName || !holidayDate) {
      setErrorMessage("Please fill in both fields!");
      return;
    }

    const holidayDateObj = new Date(holidayDate);
    if (holidayDateObj <= new Date()) {
      setErrorMessage("The date must be in the future!");
      return;
    }

    onAddCustomHoliday(holidayName, holidayDate);
    setHolidayName("");
    setHolidayDate("");
    setErrorMessage("");
  };

  return (
    <div className="custom-holidays-page min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Add a Custom Holiday
      </h1>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <div className="w-full max-w-md">
        <input
          type="text"
          value={holidayName}
          onChange={(e) => setHolidayName(e.target.value)}
          placeholder="Holiday Name"
          className="w-full p-3 mb-4 rounded-lg shadow-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          value={holidayDate}
          onChange={(e) => setHolidayDate(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg shadow-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddHoliday}
          className="w-full bg-neonGreen dark:bg-neonPurple text-white py-3 px-6 rounded-lg shadow-md hover:bg-limeGreen dark:hover:bg-electricBlue transition"
        >
          Add Holiday
        </button>
      </div>
    </div>
  );
};

CustomHolidaysPage.propTypes = {
  onAddCustomHoliday: PropTypes.func.isRequired,
};

export default CustomHolidaysPage;
