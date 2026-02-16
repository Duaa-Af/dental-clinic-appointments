import { Link, NavLink, Outlet } from "react-router-dom";
import "./layout.css";

const Layout = () => {
  return (
    <div className="screen-container">
      <div className="sidebar">
        <div className="header">
          <Link className="clinic-name" to={'/'}>Dental Clinic</Link>
        </div>
        <ul>
          <li>
            <NavLink to="/" className={({isActive})=>`${isActive&&`active`}`}>Appointments</NavLink>
          </li>
          <li>
            <NavLink to="/addappointment" className={({isActive})=>`${isActive&&`active`}`}>Add Appointment</NavLink>
          </li>
          <li>
            <NavLink to="/addpatient" className={({isActive})=>`${isActive&&`active`}`}>Add Patient</NavLink>
          </li>
        </ul>
      </div>
      <main>
        <div className="main-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
