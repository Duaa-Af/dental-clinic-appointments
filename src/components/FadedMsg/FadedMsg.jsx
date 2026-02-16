import "./fadedmsg.css";

const FadedMsg = ({ msg, type }) => {
  return (
    <div className={`faded-msg ${type === "success" && "success-msg"}`}>
      {msg}
    </div>
  );
};

export default FadedMsg;
