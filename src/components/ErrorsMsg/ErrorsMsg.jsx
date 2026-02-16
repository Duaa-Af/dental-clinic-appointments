import "./errorsmsg.css";
import { v4 as uuidv4 } from "uuid";

const ErrorsMsg = ({ messages }) => {
  return (
    <div className="errors-container">
      <ul className="errors">
        {messages.map((err) => (
          <li className="card-text" key={uuidv4()}>
            {err}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorsMsg;
