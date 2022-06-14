import { useAuth } from "../../authentication/auth";
import { Navigate, useLocation } from "react-router-dom";
import Paths from "../../utils/Paths";

export const RequireAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.cookies.username) {
    return <Navigate to={Paths.LOGIN} state={{ path: location.pathname }} />;
  }

  return children;
};

export const IsLogin = ({ children }) => {
  const auth = useAuth();

  if (auth.cookies.username) {
    return <Navigate to={Paths.HOME} />;
  }

  return children;
};

export const authenticateTableData = (response) => {
  if (JSON.stringify(response).includes("<html>")) {
    const err = "Please login again";
    throw err;
  }
  return (
    (response && response.member && response.nlsLabel) ||
    (response && response.data && response.children)
  );
};
