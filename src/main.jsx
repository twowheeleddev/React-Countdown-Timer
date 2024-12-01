import "./index.css";

import App from "./App.jsx";
import AppWrapper from "./components/wrappers/AppWrapper.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AppWrapper>
        <App />
      </AppWrapper>
    </Router>
  </StrictMode>
);
