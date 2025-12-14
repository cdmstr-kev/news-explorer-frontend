import { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState("");
  console.log(
    "🔴 MODAL CONTEXT RENDERING - activeModal:",
    activeModal,
    "Type:",
    typeof activeModal
  );

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
    console.log("🟢 MOBILE MENU CLICKED!");
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
