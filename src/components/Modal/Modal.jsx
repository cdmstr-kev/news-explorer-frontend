import "./Modal.css";
import useModalClose from "../../hooks/useModalClose.js";
import closeBtn from "../../assets/close.png";

export const Modal = ({
  isOpen,
  onClose,
  name,
  children,
  closeButtonImage,
  containerClassName = "",
  closeButtonClassName = "",
}) => {
  useModalClose(isOpen, onClose);

  console.log("isOpen in Modal:", isOpen);

  return (
    <div
      className={`modal ${isOpen ? "modal_is-open" : ""} modal_type_${name}`}
    >
      <div className={`modal__container ${containerClassName}`}>
        {children}
        <button
          className={`modal__close-btn ${closeButtonClassName}`}
          type="button"
          onClick={onClose}
        >
          <img src={closeButtonImage || closeBtn} alt="close-icon" />
        </button>
      </div>
    </div>
  );
};
