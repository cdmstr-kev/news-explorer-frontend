import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import useForm from "../../hooks/useForm.js";
import "./LoginModal.css";

const LoginModal = ({
  isOpen,
  handleCloseActiveModal,
  handleSubmit,
  isLoading,
  handleOpenRegister,
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
    resetForm();
  };

  return (
    <div>
      <ModalWithForm
        isFormValid={isFormValid}
        isOpen={isOpen}
        title={"Sign In"}
        handleCloseActiveModal={handleCloseActiveModal}
        onSubmit={onSubmit}
        buttonText={"Sign In"}
        footerButton={
          !isLoading && (
            <button
              type="button"
              className="modal__switch"
              onClick={handleOpenRegister}
            >
              or <span className={"modal__switch_color-blue"}>Sign up</span>
            </button>
          )
        }
      >
        <fieldset className="modal__fieldset">
          <label className={"modal__label"}>
            Email
            <input
              className={"modal__input"}
              type={"email"}
              name={"email"}
              placeholder={"Enter your email"}
              required
              value={values.email}
              onChange={handleChange}
            />
          </label>
        </fieldset>
        {errors.email && <span className={"login__error"}>{errors.email}</span>}

        <fieldset className="modal__fieldset">
          <label className={"modal__label"}>
            Password
            <input
              className={"modal__input"}
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
    </div>
  );
};
export default LoginModal;
