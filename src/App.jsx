import { Route, Routes, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import CountdownTimer from "./components/CountdownTimer";
import CustomHolidaysPage from "./components/CustomHolidaysPage";
import EventForm from "./components/EventForm";
import HolidayPage from "./components/HolidayPage";
import Holidays from "date-holidays";
import TimerList from "./components/TimerList";
import TimerPage from "./components/TimerPage";

const App = () => {
  const [timers, setTimers] = useState([]);
  const [customHolidays, setCustomHolidays] = useState([]); // User-defined holidays
  const [currentHoliday, setCurrentHoliday] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentHolidayTime, setCurrentHolidayTime] = useState(0);
  const navigate = useNavigate();

  const hd = new Holidays("US");

  // Function to get the next holiday (system + custom)
  const calculateNextHoliday = useCallback(() => {
    const now = new Date();

    // Get system holidays
    const holidays = hd.getHolidays(now.getFullYear()).map((holiday) => ({
      name: holiday.name,
      date: new Date(holiday.date),
    }));

    // Include custom user-defined holidays
    const allHolidays = [...holidays, ...customHolidays].filter(
      (holiday) => holiday.date > now
    );

    // Sort holidays by date
    allHolidays.sort((a, b) => a.date - b.date);

    return allHolidays.length > 0 ? allHolidays[0] : null;
  }, [customHolidays, hd]);

  useEffect(() => {
    const nextHoliday = calculateNextHoliday();

    if (nextHoliday) {
      setCurrentHoliday(nextHoliday.name);
      const targetDate = nextHoliday.date;

      // Run the timer logic immediately
      const updateTime = () => {
        const now = new Date();
        const timeLeft = Math.floor((targetDate - now) / 1000);
        setCurrentHolidayTime(timeLeft > 0 ? timeLeft : 0);

        if (timeLeft <= 0) {
          const newHoliday = calculateNextHoliday();
          if (newHoliday) {
            setCurrentHoliday(newHoliday.name);
          }
        }
      };

      // Update time immediately
      updateTime();

      // Start the interval
      const interval = setInterval(updateTime, 1000);

      return () => clearInterval(interval); // Clean up the interval
    }
  }, [calculateNextHoliday]);

  const handleAddCustomHoliday = (name, date) => {
    const holidayDate = new Date(date);

    // Validate custom holiday date
    if (holidayDate <= new Date()) {
      setErrorMessage("Custom holiday date must be in the future!");
      return;
    }

    // Add custom holiday
    const newHoliday = { name, date: holidayDate };
    setCustomHolidays((prev) => [...prev, newHoliday]);
    setErrorMessage("");
  };

  const handleAddTimer = (eventTitle, targetDateTime, category = "default") => {
    const { date, time } = targetDateTime;

    if (!eventTitle || !date || !time) {
      setErrorMessage("Please complete all fields!");
      return;
    }

    const targetDate = new Date(`${date}T${time}:00`);
    if (targetDate <= new Date()) {
      setErrorMessage("The selected date and time must be in the future!");
      return;
    }

    const secondsLeft = Math.floor((targetDate - new Date()) / 1000);
    const newTimer = {
      id: Date.now(),
      title: eventTitle,
      time: secondsLeft,
      category,
    };

    setTimers((prevTimers) => [...prevTimers, newTimer]);
    setErrorMessage("");
    navigate("/timers");
  };

  const handleTimerEnd = (id) => {
    setTimers((prevTimers) => prevTimers.filter((timer) => timer.id !== id));
  };

  return (
      <Routes>
        <Route
          path="/"
          element={
            <div className="max-w-lg w-full text-center mx-auto mt-10 px-4 sm:px-6 md:px-8">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  {currentHoliday
                    ? `${currentHoliday} is approaching...`
                    : "Loading next holiday..."}
                </h2>
                {currentHoliday && (
                  <div
                    onClick={() =>
                      navigate(
                        `/holiday/${currentHoliday
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`
                      )
                    }
                    className="cursor-pointer hover:scale-105 transition-transform"
                  >
                    <CountdownTimer
                      time={currentHolidayTime}
                      theme="bg-yellow-200 dark:bg-yellow-500 text-gray-800 dark:text-gray-900"
                      onEnd={() => {
                        const newHoliday = calculateNextHoliday();
                        if (newHoliday) {
                          setCurrentHoliday(newHoliday.name);
                        }
                      }}
                      holiday={currentHoliday}
                    />
                  </div>
                )}
              </div>
              <EventForm
                onAddTimer={handleAddTimer}
                errorMessage={errorMessage}
                onAddCustomHoliday={handleAddCustomHoliday}
              />
            </div>
          }
        />
        <Route
          path="/timers"
          element={<TimerList timers={timers} onTimerEnd={handleTimerEnd} />}
        />
        <Route
          path="/custom-holidays"
          element={
            <CustomHolidaysPage onAddCustomHoliday={handleAddCustomHoliday} />
          }
        />
        <Route path="/timer/:id" element={<TimerPage timers={timers} />} />
        <Route
          path="/holiday/:holidayName"
          element={<HolidayPage customHolidays={customHolidays} />}
        />
      </Routes>
 
  );
};

export default App;
