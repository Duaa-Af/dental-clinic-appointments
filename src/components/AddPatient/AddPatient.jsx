import "./addpatient.css";
import { useState } from "react";
import { usePatientContext } from "../../contexts/PatientContext";
import { v4 as uuidv4 } from "uuid";
import ErrorsMsg from "../ErrorsMsg/ErrorsMsg";
import FadedMsg from "../FadedMsg/FadedMsg";

const AddPatient = () => {
  const { addPatient } = usePatientContext();
  const [patient, setPatient] = useState({
    id: "",
    name: "",
    phone: "",
    blood: "A",
  });
  const [errors, setErrors] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const bloodTypes = [
    {
      id: 1,
      name: "A",
    },
    {
      id: 2,
      name: "B",
    },
    {
      id: 3,
      name: "AB",
    },
    {
      id: 4,
      name: "O-",
    },
    {
      id: 5,
      name: "O+",
    },
  ];
  const nameRegex = /^[A-Za-z\s]+$/;
  const phoneRegex = /^[0-9]+$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = [];
    if (patient.name.length < 2 || patient.name.length > 20) {
      newErrors.push("Name length should be between 1 and 20");
    }
    if (!nameRegex.test(patient.name)) {
      newErrors.push("Name should only contain characters");
    }
    if (!phoneRegex.test(patient.phone)) {
      newErrors.push("Phone should only contain numbers");
    }
    if (patient.phone.length < 9 || patient.phone.length > 15) {
      newErrors.push("Phone length should be between 9 and 15");
    }
    setErrors(newErrors);
    if (newErrors.length === 0) {
      let newPatient = { ...patient, id: uuidv4() };
      addPatient({ ...newPatient });
      setPatient({
        id: "",
        name: "",
        phone: "",
        blood: "A",
      });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  return (
    <>
      <div className="add-form-container">
        {errors.length > 0 && <ErrorsMsg messages={errors} />}

        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <span className="input-label">Name</span>
            <input
              type="text"
              className="main-input main-input-with-label"
              value={patient.name}
              onChange={(e) => {
                setPatient({ ...patient, name: e.target.value });
              }}
            />
          </div>

          <div className="input-container">
            <span className="input-label">Phone</span>
            <input
              type="tel"
              className="main-input main-input-with-label"
              value={patient.phone}
              onChange={(e) => {
                setPatient({ ...patient, phone: e.target.value });
              }}
            />
          </div>

          <div className="input-container">
            <span className="input-label">Blood</span>
            <select
              className="main-input main-input-with-label"
              value={patient.blood}
              onChange={(e) => {
                setPatient({ ...patient, blood: e.target.value });
              }}
            >
              {bloodTypes.map((type) => {
                return (
                  <option value={type.name} key={type.id}>
                    {type.name}
                  </option>
                );
              })}
            </select>
          </div>
          <input type="submit" value="Add" className="main-btn" />
        </form>
        {showSuccess && <FadedMsg msg={`Patient added successfully`} />}
      </div>
    </>
  );
};
export default AddPatient;
