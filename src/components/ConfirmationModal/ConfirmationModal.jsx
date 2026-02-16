import "./confirmationmodal.css";

const ConfirmationModal = ({ message, confirmBtn, onConfirm, onCancel }) => {
  return (
    <div
      className="confirmation-modal"
      tabIndex="-1"
      style={{ display: "block" }}
    >
      <div className="main-container">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <p>{message}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="main-btn btn-cancel"
                data-bs-dismiss="modal"
                onClick={() => {
                  onCancel();
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="main-btn btn-primary"
                onClick={() => {
                  onConfirm();
                }}
              >
                {confirmBtn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmationModal;
