import { createContext, useContext, useState, useEffect } from "react";
const PatientContext = createContext([]);

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState(() => {
    const savedPatients = localStorage.getItem("patients");
    return savedPatients ? JSON.parse(savedPatients) : [];
  });

  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  const addPatient = (patient) => {
    setPatients([...patients, { ...patient }]);
  };

  const getMatchedPatients = (data) => {
    return patients.filter((p) => {
      return p.name.toLowerCase().includes(data.toLowerCase());
    });
  };

  const getPatientById = (id) => {
    return patients.find((p) => {
      return p.id === id;
    });
  };
  
  return (
    <PatientContext.Provider
      value={{ patients, addPatient, getMatchedPatients, getPatientById }}
    >
      {children}
    </PatientContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const usePatientContext = () => {
  return useContext(PatientContext);
};
