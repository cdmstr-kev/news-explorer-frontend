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
  footerButton,
  isFormValid,
}) {
  return (
    <div>
      <Modal name={name} isOpen={isOpen} onClose={handleCloseActiveModal}>
        <h2 className={"modal__title"}>{title}</h2>
        <form onSubmit={onSubmit} className={"modal__form"}>
          {children}

          <button
            disabled={!isFormValid}
            type={"submit"}
            className={`modal__submit-btn ${!isFormValid && "modal__submit-btn_disabled"}`}
          >
            {buttonText}
          </button>
          {footerButton}
        </form>
      </Modal>
    </div>
  );
}
