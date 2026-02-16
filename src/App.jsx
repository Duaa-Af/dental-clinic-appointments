import "./App.css";
import { Routes, Route } from "react-router-dom";
import AddAppointment from "./components/AddAppointment/AddAppointment";
import AddPatient from "./components/AddPatient/AddPatient";
import Appointments from "./components/Appointments/Appointments";
import Layout from "./components/Layout/Layout";
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Appointments />} />
        <Route path="/addappointment" element={<AddAppointment />} />
        <Route path="/addpatient" element={<AddPatient />} />
      </Route>
    </Routes>
  );
}

export default App;
