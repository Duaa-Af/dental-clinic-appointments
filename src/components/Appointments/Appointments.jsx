import "react-datepicker/dist/react-datepicker.css";
import "./appointments.css";
import { useEffect, useMemo, useState } from "react";
import { useAppointmentsContext } from "../../contexts/AppointmentsContext";
import DatePicker from "react-datepicker";
import { v4 as uuidv4 } from "uuid";
import Appointment from "../Appointment/Appointment";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

const Appointments = () => {
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
  const { appointments, getAppointmentsByDate, deleteAppointment } =
    useAppointmentsContext();
  const [appoints, setAppoints] = useState([]);
  const [appointmentsDate, setAppointmentsDate] = useState(
    getNextAvailableDay(),
  );
  const [activeBtn, setActiveBtn] = useState("all");
  const [modalOpened, setModalOpened] = useState(false);
  const [targetDelAppo, setTargetAppo] = useState({});

  useEffect(() => {
    let dateAppointments = getAppointmentsByDate(appointmentsDate);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAppoints([...dateAppointments]);
  }, [appointments, getAppointmentsByDate]);
  useEffect(() => {
    let dateAppointments = getAppointmentsByDate(appointmentsDate);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAppoints([...dateAppointments]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointmentsDate]);

  const filteredAppointments = useMemo(() => {
    return appoints.filter((app) => {
      return app.status.toLowerCase() === activeBtn.toLowerCase();
    });
  }, [appoints, activeBtn]);

  const deletingAppo = (appo) => {
    let newAppo = { ...appo };
    setTargetAppo({ ...newAppo });
    setModalOpened(true);
  };

  const deleteAppo = () => {
    deleteAppointment(targetDelAppo.id);
    setModalOpened(false);
  };

  return (
    <>
      <div className="appointments-card">
        <div className="appointments-card-header">
          <ul>
            <li>
              <a
                className={`${activeBtn === "all" && "active"}`}
                onClick={() => setActiveBtn("all")}
              >
                All
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`${activeBtn === "waiting" && "active"}`}
                onClick={() => setActiveBtn("waiting")}
              >
                Waiting
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`${activeBtn === "treatment" && "active"}`}
                onClick={() => setActiveBtn("treatment")}
              >
                In Treatment
              </a>
            </li>
          </ul>
          <DatePicker
            selected={appointmentsDate}
            onChange={(date) => {
              setAppointmentsDate(date);
            }}
            filterDate={(date) => {
              const day = date.toLocaleDateString("en-US", {
                weekday: "long",
              });
              return clinicSchedule[day]?.length > 0;
            }}
            minDate={new Date()}
            dateFormat="yyyy-MM-dd"
            placeholderText="Choose Date"
            className="main-input"
          />
        </div>
        {appoints.length === 0 && filteredAppointments.length === 0 ? (
          <p style={{ marginTop: "20px" }}>
            No appointments are available today
          </p>
        ) : (
          <div className="appointments-card-body">
            {activeBtn === "all" &&
              appoints.map((appo) => (
                <Appointment
                  appointment={appo}
                  key={uuidv4()}
                  deleteAppoint={deletingAppo}
                />
              ))}
            {activeBtn !== "all" &&
              filteredAppointments.map((appo) => (
                <Appointment
                  appointment={appo}
                  key={uuidv4()}
                  deleteAppoint={deletingAppo}
                />
              ))}
          </div>
        )}

        {modalOpened && (
          <ConfirmationModal
            message={`Are You Sure You Want To Delete This Appointment?`}
            confirmBtn="Delete"
            onConfirm={deleteAppo}
            onCancel={() => {
              setModalOpened(false);
            }}
          />
        )}
      </div>
    </>
  );
};
export default Appointments;
