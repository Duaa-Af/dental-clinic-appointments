import "./appointment.css";
import { useAppointmentsContext } from "../../contexts/AppointmentsContext";
import { usePatientContext } from "../../contexts/PatientContext";

const Appointment = ({ appointment, deleteAppoint }) => {
  const statuses = [
    {
      id: 0,
      status: "Scheduled",
    },
    {
      id: 1,
      status: "Waiting",
    },
    {
      id: 2,
      status: "Treatment",
    },
    {
      id: 3,
      status: "Done",
    },
  ];
  const statusClasses = {
    Scheduled: "status-primary",
    Waiting: "status-warning",
    Treatment: "status-success",
    Done: "status-secondary",
  };
  const { getPatientById } = usePatientContext();
  const { updateAppointmentStatus } = useAppointmentsContext();
  const patient = getPatientById(appointment.patientId);
  const appDate = new Date(appointment.date);
  const todayDate = new Date();

  return (
    <div className="appointment-card" style={{ width: "18rem" }}>
      <div className="card-header">
        <div className="infos-side">
          <div className="name">{patient.name}</div>
          <span className="time">{appointment.time}</span>
        </div>

        <span className={`status ${statusClasses[appointment.status]}`}></span>
      </div>
      <div className="card-body">
        <ul>
          <li>
            <span>Phone:</span> {patient.phone}
          </li>
          <li>
            <span>Type:</span> {appointment.type}
          </li>
          <li>
            <span>Blood Type:</span> {patient.blood}
          </li>
        </ul>

        {todayDate.toDateString("en-GB") === appDate.toDateString("en-GB") && (
          <div className="statuses-container">
            {statuses.map((stat) => (
              <div className="form-check" key={stat.id}>
                <input
                  className="form-check-input"
                  type="radio"
                  name={`status-${appointment.id}`}
                  id={`status-${appointment.id}-${stat.status}`}
                  checked={stat.status === appointment.status}
                  onChange={() =>
                    updateAppointmentStatus(appointment.id, stat.status)
                  }
                />

                <label
                  className="form-check-label"
                  htmlFor={`status-${appointment.id}-${stat.status}`}
                >
                  {stat.status}
                </label>
              </div>
            ))}
          </div>
        )}
        {appointment.status === "Scheduled" && (
          <div className="card-footer">
            <button
              className="main-btn btn-danger"
              onClick={() => deleteAppoint(appointment)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Appointment;
