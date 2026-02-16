import { createContext, useContext, useState, useEffect } from "react";
const AppointmentsContext = createContext([]);
export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState(() => {
    const savedAppointments = localStorage.getItem("appointments");
    return savedAppointments ? JSON.parse(savedAppointments) : [];
  });

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);
  const addAppointment = (appointment) => {
    setAppointments([...appointments, { ...appointment }]);
  };

  const isTimeTaken = (date, time) => {
    const dateStr = date.toDateString();
    return appointments.some(
      (b) => new Date(b.date).toDateString() === dateStr && b.time === time,
    );
  };

  const getAppointmentsByDate = (date) => {
    const dateStr = date.toDateString();
    return appointments.filter((appo) => {
      return new Date(appo.date).toDateString() === dateStr;
    });
  };

  const updateAppointmentStatus = (id, status) => {
    let newAppointments = appointments.map((appo) =>
      appo.id === id
        ? {
            ...appo,
            status,
          }
        : appo
    );
    setAppointments(newAppointments);
  };

  const deleteAppointment = (id) => {
    let newAppointments = appointments.filter((appo) => {
      return appo.id !== id;
    });
    setAppointments(newAppointments);
  };
  
  return (
    <AppointmentsContext.Provider
      value={{
        appointments,
        addAppointment,
        isTimeTaken,
        getAppointmentsByDate,
        updateAppointmentStatus,
        deleteAppointment
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAppointmentsContext = () => {
  return useContext(AppointmentsContext);
};
