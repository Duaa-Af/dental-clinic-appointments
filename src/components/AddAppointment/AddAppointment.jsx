import "react-datepicker/dist/react-datepicker.css";
import "./addappointment.css";
import { useState } from "react";
import { useAppointmentsContext } from "../../contexts/AppointmentsContext";
import { usePatientContext } from "../../contexts/PatientContext";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import ErrorsMsg from "../ErrorsMsg/ErrorsMsg";
import FadedMsg from "../FadedMsg/FadedMsg";

const AddAppointment = () => {
  const clinicSchedule = {
    Saturday: [],
    Sunday: ["09:30", "10:00", "10:30", "01:00", "04:00"],
    Monday: ["09:00", "09:30", "10:00", "10:30", "01:00", "02:00"],
    Tuesday: ["10:00", "12:00", "01:00", "03:00"],
    Wednesday: ["10:00", "12:00", "01:00", "03:00"],
    Thursday: ["09:00", "09:30", "10:00", "10:30", "01:00", "02:00"],
    Friday: [],
  };
  const getNextAvailableDay = () => {
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const checkDate = new Date();
      checkDate.setDate(today.getDate() + i);

      const dayName = checkDate.toLocaleDateString("en-US", {
        weekday: "long",
      });

      if (clinicSchedule[dayName].length > 0) {
        return checkDate;
      }
    }
  };
  const { isTimeTaken, addAppointment } = useAppointmentsContext();
  const { getMatchedPatients } = usePatientContext();
  const [patientName, setPatientName] = useState("");
  const [disableAdd, setDisableAdd] = useState(true);
  const [appointment, setAppointment] = useState({
    id: "",
    patientId: "",
    date: getNextAvailableDay(),
    type: "",
    time: "",
    status: "Scheduled",
  });
  const [matchedPatients, setMatchedPatients] = useState([]);
  const [errors, setErrors] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const nameRegex = /^[A-Za-z\s]+$/;
  const appointmentTypes = [
    {
      id: 0,
      name: "pre",
    },
    {
      id: 1,
      name: "direct",
    },
    {
      id: 2,
      name: "emergency",
    },
  ];

  const dayName = appointment.date
    ? appointment.date.toLocaleDateString("en-US", { weekday: "long" })
    : null;
  const availableTimes = dayName ? clinicSchedule[dayName] : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = [];
    if (patientName.length < 1 || patientName.length > 20) {
      newErrors.push("Name length should be between 1 and 20");
    }
    if (!nameRegex.test(patientName)) {
      newErrors.push("Name should only contain characters");
    }
    if (appointment.type.length === 0) {
      newErrors.push("Please choose type");
    }
    if (appointment.date.length === 0) {
      newErrors.push("Please choose date");
    }
    if (appointment.time.length === 0) {
      newErrors.push("Please choose time");
    }
    setErrors(newErrors);
    if (newErrors.length === 0) {
      let newAppointment = { ...appointment, id: uuidv4() };
      addAppointment({ ...newAppointment });
      setAppointment({
        id: "",
        patientId: "",
        date: new Date(),
        type: "",
        time: "",
        status: "Scheduled",
      });
      setPatientName("");
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  const chooseAddPatient = () => {
    if (matchedPatients.length > 0 && patientName.length > 0) {
      return (
        <ul className="matched-patient-list">
          {matchedPatients.map((patient) => (
            <li
              key={uuidv4()}
              onClick={() => {
                setPatientName(patient.name);
                setAppointment({ ...appointment, patientId: patient.id });
                setDisableAdd(false);
              }}
            >
              <span>{patient.name}</span>
              <span>{patient.phone}</span>
            </li>
          ))}
        </ul>
      );
    } else {
      return (
        <Link to={"/addpatient"} className="main-btn">
          Add Patient
        </Link>
      );
    }
  };
  return (
    <>
      <div className="add-form-container">
        {errors.length > 0 && <ErrorsMsg messages={errors} />}
        <div className="choose-add-patient">{chooseAddPatient()}</div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <span className="input-label">Name</span>
            <input
              type="text"
              placeholder="Start typing to search patients"
              className="main-input main-input-with-label"
              value={patientName}
              onChange={(e) => {
                let newPatientName = e.target.value;
                setPatientName(newPatientName);
                const newMatchedPatients = getMatchedPatients(newPatientName);
                setMatchedPatients([...newMatchedPatients]);
                setDisableAdd(true);
              }}
            />
          </div>

          
            <>
              <div className="input-container">
                <span className="input-label">Type</span>
                <select
                  className="main-input main-input-with-label"
                  value={appointment.type}
                  onChange={(e) => {
                    setAppointment({ ...appointment, type: e.target.value });
                  }}
                  disabled={disableAdd}
                >
                  <option value="">Choose Type</option>
                  {appointmentTypes.map((type) => {
                    return (
                      <option value={type.name} key={type.id}>
                        {type.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="input-container">
                <span className="input-label">Date</span>
                <DatePicker
                  selected={appointment.date}
                  className="main-input main-input-with-label"
                  onChange={(date) =>
                    setAppointment({ ...appointment, date: date })
                  }
                  filterDate={(date) => {
                    const day = date.toLocaleDateString("en-US", {
                      weekday: "long",
                    });
                    return clinicSchedule[day]?.length > 0;
                  }}
                  minDate={new Date()}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Choose Date"
                  disabled={disableAdd}
                />
              </div>
              <div className="input-container">
                <span className="input-label" id="inputGroup-sizing-lg">
                  Time
                </span>
                <select
                  value={appointment.time}
                  className="main-input main-input-with-label"
                  onChange={(e) =>
                    setAppointment({ ...appointment, time: e.target.value })
                  }
                  disabled={!appointment.date||disableAdd}
                >
                  <option value="">Choose Time</option>
                  {availableTimes.map((t) => {
                    if (!isTimeTaken(appointment.date, t)) {
                      return (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      );
                    }
                  })}
                </select>
              </div>
              <input type="submit" value="Add" className={`main-btn ${disableAdd&&'disabled'}`} disabled={disableAdd} />
            </>
          
        </form>
        {showSuccess && <FadedMsg msg={`Appointment added successfully`} />}
      </div>
    </>
  );
};
export default AddAppointment;
