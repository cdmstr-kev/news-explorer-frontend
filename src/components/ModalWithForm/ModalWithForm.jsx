import { Modal } from "../Modal/Modal.jsx";
import "./ModalWithForm.css";

export default function ModalWithForm({
  children,
  buttonText,
  title,
  name,
  isOpen,
  handleCloseActiveModal,
  onSubmit,
  isLoading,
  handleOpenLogin,
  activeModal,
  footerButton,
}) {
  return (
    <div>
      <Modal name={name} isOpen={isOpen} onClose={handleCloseActiveModal}>
        <h2 className={"modal__title"}>{title}</h2>
        <form onSubmit={onSubmit} className={"modal__form"}>
          {children}

          <button type={"submit"} className={"modal__submit-btn"}>
            {buttonText}
          </button>
          {footerButton}
        </form>
      </Modal>
    </div>
  );
}
