import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AppWrapper from "./components/wrappers/AppWrapper";
import EventForm from "./components/EventForm";
import TimerList from "./components/TimerList";
import TimerPage from "./components/TimerPage";

const App = () => {
  const [timers, setTimers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddTimer = (eventTitle, targetDateTime) => {
    const { date, time } = targetDateTime;

    if (!eventTitle || !date || !time) {
      setErrorMessage("Please complete all fields!");
      return;
    }

    const targetDate = new Date(`${date}T${time}:00`);
    const now = new Date();

    if (targetDate <= now) {
      setErrorMessage("The selected date and time must be in the future!");
      return;
    }

    const secondsLeft = Math.floor((targetDate - now) / 1000);

    setTimers((prevTimers) => [
      ...prevTimers,
      { id: Date.now(), title: eventTitle, time: secondsLeft },
    ]);

    setErrorMessage("");
  };

  const handleTimerEnd = (id) => {
    setTimers((prevTimers) => prevTimers.filter((timer) => timer.id !== id));
  };

  return (
    <Router>
      <AppWrapper>
        <Routes>
          {/* Home page with form and list */}
          <Route
            path="/"
            element={
              <div className="max-w-lg w-full text-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Countdown Timers
                </h1>
                <EventForm onAddTimer={handleAddTimer} errorMessage={errorMessage} />
                <TimerList timers={timers} onTimerEnd={handleTimerEnd} />
              </div>
            }
          />
          {/* Dynamic timer page */}
          <Route path="/timer/:id" element={<TimerPage timers={timers} />} />
        </Routes>
      </AppWrapper>
    </Router>
  );
};

export default App;
