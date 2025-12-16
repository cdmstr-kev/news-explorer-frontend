import { useState } from "react";
import { ModalContext } from "./modal-context.js";

export const ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState("");

  const handleCloseActiveModal = () => {
    setActiveModal("");
  };

  const handleOpenRegister = () => {
    setActiveModal("register-modal");
  };

  const handleOpenSignIn = () => {
    setActiveModal("signin-modal");
  };

  const handleMobileMenuClick = () => {
    setActiveModal("header-modal");
  };

  const value = {
    activeModal,
    setActiveModal,
    handleCloseActiveModal,
    handleOpenRegister,
    handleOpenSignIn,
    handleMobileMenuClick,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
