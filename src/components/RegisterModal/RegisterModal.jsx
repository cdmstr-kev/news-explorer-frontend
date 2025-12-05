import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import useForm from "../../hooks/useForm.js";
import "./RegisterModal.css";

const RegisterModal = ({
  isOpen,
  handleCloseActiveModal,
  onUserRegister,
  handleSignIn,
  isLoading,
  setIsLoading,
  handleOpenLogin,
}) => {
  const defaultValues = {
    email: "",
    password: "",
    username: "",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(values);
    onUserRegister(values);
    resetForm();
    setIsLoading(false);
  };

  const { values, handleChange, resetForm } = useForm(defaultValues);

  return (
    <div>
      <ModalWithForm
        isOpen={isOpen}
        title={"Sign Up"}
        onSubmit={handleSubmit}
        name={"register-modal"}
        buttonText={"Sign Up"}
        handleCloseActiveModal={handleCloseActiveModal}
        footerButton={
          !isLoading && (
            <button
              type="button"
              className="modal__switch"
              onClick={handleOpenLogin}
            >
              or <span className={"modal__switch_color-blue"}>Sign in</span>
            </button>
          )
        }
      >
        <fieldset className="modal__fieldset">
          <label htmlFor="registration-email" className="modal__label">
            Email
            <input
              id="registration-email"
              className="modal__input"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              value={values.email}
              onChange={handleChange}
            />
          </label>
        </fieldset>

        <fieldset className="modal__fieldset">
          <label htmlFor="registration-password" className="modal__label">
            Password
            <input
              id="registration-password"
              className="modal__input"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </label>
        </fieldset>

        <fieldset className="modal__fieldset">
          <label htmlFor="user-name" className="modal__label">
            Username
            <input
              id="user-name"
              className="modal__input"
              type="text"
              name="username"
              value={values.name}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </label>
        </fieldset>
      </ModalWithForm>
    </div>
  );
};
export default RegisterModal;
