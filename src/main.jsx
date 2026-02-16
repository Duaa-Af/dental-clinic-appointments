import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppointmentsProvider } from "./contexts/AppointmentsContext";
import { PatientProvider } from "./contexts/PatientContext";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PatientProvider>
      <AppointmentsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppointmentsProvider>
    </PatientProvider>
  </StrictMode>,
);
