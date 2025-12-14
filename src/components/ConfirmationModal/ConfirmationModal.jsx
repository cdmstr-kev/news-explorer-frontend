import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext.jsx";

import { Modal } from "../Modal/Modal.jsx";
import "./ConfirmationModal.css";

const ConfirmationModal = ({ message, buttonText }) => {
  const { activeModal, handleCloseActiveModal, handleOpenSignIn } =
    useContext(ModalContext);
  const isOpen = activeModal === "confirmation-modal";

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
