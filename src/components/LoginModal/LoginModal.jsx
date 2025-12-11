import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import useForm from "../../hooks/useForm.js";
import "./LoginModal.css";
import { useEffect } from "react";

const LoginModal = ({
  isOpen,
  handleCloseActiveModal,
  handleSubmit,
  handleOpenRegister,
  loginError,
}) => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const { values, handleChange, resetForm, isFormValid, errors } =
    useForm(defaultValues);

  const onSubmit = (e) => {
    e.preventDefault();

    handleSubmit(values);
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      isFormValid={isFormValid}
      isOpen={isOpen}
      title={"Sign In"}
      handleCloseActiveModal={handleCloseActiveModal}
      onSubmit={onSubmit}
      buttonText={"Sign In"}
      footerButton={
        <button
          type="button"
          className="modal__switch"
          onClick={handleOpenRegister}
        >
          or <span className={"modal__switch_color-blue"}>Sign up</span>
        </button>
      }
    >
      <fieldset className="modal__fieldset">
        <label htmlFor={"login-email"} className={"modal__label"}>
          Email
          <input
            className={"modal__input"}
            id={"login-email"}
            type={"email"}
            name={"email"}
            placeholder={"Enter your email"}
            autoComplete="email"
            required
            value={values.email}
            onChange={handleChange}
          />
        </label>
      </fieldset>
      {(errors.email || loginError) && (
        <span className={"login__error"}>{errors.email || loginError}</span>
      )}

      <fieldset className="modal__fieldset">
        <label htmlFor={"login-password"} className={"modal__label"}>
          Password
          <input
            className={"modal__input"}
            id={"login-password"}
            type={"password"}
            name={"password"}
            placeholder={"Enter your password"}
            required
            value={values.password}
            onChange={handleChange}
          />
        </label>
      </fieldset>
    </ModalWithForm>
  );
};
export default LoginModal;
