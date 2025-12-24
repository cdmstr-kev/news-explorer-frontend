import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth-context.js";
import { ModalContext } from "../../contexts/modal-context.js";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const { setActiveModal } = useContext(ModalContext);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      setActiveModal("signin-modal");
    }
  }, [isLoggedIn, isLoading, setActiveModal]);

  if (isLoading) {
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
