import { Modal } from "../Modal/Modal.jsx";
import "./ConfirmationModal.css";

const ConfirmationModal = ({
  isOpen,
  handleCloseActiveModal,
  handleOpenSignIn,
  message,
  buttonText,
}) => {
  return (
    <Modal
      name={"confirmation"}
      isOpen={isOpen}
      onClose={handleCloseActiveModal}
    >
      <h2 className={"confirmation-modal__title"}>{message}</h2>
      {buttonText && (
        <button
          className={"confirmation-modal__btn"}
          onClick={handleOpenSignIn}
          type={"button"}
        >
          {buttonText}
        </button>
      )}
    </Modal>
  );
};
export default ConfirmationModal;
