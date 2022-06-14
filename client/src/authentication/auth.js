import { createContext, useContext, useState } from "react";
import { useCookies } from "react-cookie";
import Paths from "../utils/Paths";
import { BODY, ENDPOINT } from "../utils/ServiceUtils";
import StorageConstants from "../utils/StorageConstants";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [progress, setProgress] = useState(false);
  const [cookies, setCookie] = useCookies([
    "username",
    "Cookies",
    "CSRF_TOKEN",
    "3dspace",
    "3dpassport",
  ]);
  const loginUrl = "http://localhost:5000/api/enovia/login";

  const handleCookie = (credentials, storageItems) => {
    setCookie("username", credentials.username, {
      path: "/",
      secure: true,
      sameSite: "none",
      maxAge: 10 * 3600,
    });
    setCookie("Cookies", credentials.Cookies, {
      path: "/",
      secure: true,
      sameSite: "none",
      maxAge: 10 * 3600,
    });
    setCookie("CSRF_TOKEN", credentials.CSRF_TOKEN, {
      path: "/",
      secure: true,
      sameSite: "none",
      maxAge: 10 * 3600,
    });
    setCookie("3dspace", credentials["3dspace"], {
      path: "/",
      secure: true,
      sameSite: "none",
    });
    setCookie("3dpassport", credentials["3dpassport"], {
      path: "/",
      secure: true,
      sameSite: "none",
    });
    localStorage.setItem(StorageConstants.FirstName, storageItems?.firstname);
    localStorage.setItem(StorageConstants.LastName, storageItems?.lastname);
    localStorage.setItem(StorageConstants.Cookies, storageItems?.Cookies);
    localStorage.setItem(
      StorageConstants.SecurityContexts,
      storageItems?.securityContexts
    );
    localStorage.setItem(StorageConstants.Preferred, storageItems?.preferred);
    localStorage.setItem(StorageConstants.CSRF_TOKEN, storageItems?.CSRF_TOKEN);
    localStorage.setItem(
      StorageConstants.SPACE3d,
      storageItems ? storageItems["3dspace"] : ""
    );
  };

  const [authenticationDetails, setAuthenticationDetails] = useState({
    username: "",
    password: "",
    "3dspace": "",
    CSRF_TOKEN: "",
    Cookies: "",
    "3dpassport": "",
  });

  const loginImpl = (response, credentials, location, navigate) => {
    const { firstname, lastname, preferred, securityContexts } = response;
    credentials.CSRF_TOKEN = response?.data?.csrf?.value;
    credentials.Cookies = response["set-cookie"];
    handleCookie(credentials, {
      firstname: firstname,
      lastname: lastname,
      preferred: preferred,
      securityContexts: securityContexts,
      CSRF_TOKEN: credentials.CSRF_TOKEN,
      Cookies: credentials.Cookies,
      "3dspace": credentials["3dspace"],
    });
    setAuthenticationDetails({
      username: credentials.username,
      password: credentials.password,
      "3dspace": credentials["3dspace"],
      CSRF_TOKEN: credentials.CSRF_TOKEN,
      Cookies: credentials.Cookies,
      "3dpassport": credentials["3dpassport"],
    });
    setTimeout(() => {
      navigate(location?.state?.path || Paths.HOME, { replace: true });
    }, 3000);
    setProgress(false);
  };

  const login = async (credentials, location, navigate) => {
    try {
      setProgress(true);
      const data = {
        username: credentials.username,
        password: credentials.password,
        passportUrl: credentials["3dpassport"],
        spaceUrl: credentials["3dspace"],
        loginTicketURL: ENDPOINT.LOGIN_TICKET,
        casAuthUrl: ENDPOINT.CAS_AUTHENICATION,
        casAuthBody: BODY.CAS_AUTHENICATION_BODY,
        csrfTokenUrl: ENDPOINT.CSRF_TOKEN,
        collabspaceUrl: ENDPOINT.COLLABORATION_SPACE,
      };
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resBody = await response.json();
      if (resBody.status !== 200 || !resBody?.data?.csrf?.value) {
        throw resBody.message;
      }
      loginImpl(resBody, credentials, location, navigate);
      return resBody;
    } catch (error) {
      const message = "Invalid Credentials or Settings";
      console.error(`${message} : ${error}`);
      setProgress(false);
      alert(message);
    }
  };

  const logout = () => {
    setAuthenticationDetails({
      username: "",
      password: "",
      "3dspace": "",
      CSRF_TOKEN: "",
      Cookies: "",
      "3dpassport": "",
    });
    handleCookie({
      username: "",
      password: "",
      "3dspace": cookies["3dspace"],
      CSRF_TOKEN: "",
      Cookies: "",
      "3dpassport": cookies["3dpassport"],
    });
    localStorage.removeItem(StorageConstants.FirstName);
    localStorage.removeItem(StorageConstants.LastName);
    localStorage.removeItem(StorageConstants.Cookies);
    localStorage.removeItem(StorageConstants.SecurityContexts);
    localStorage.removeItem(StorageConstants.Preferred);
    localStorage.removeItem(StorageConstants.CSRF_TOKEN);
    localStorage.removeItem(StorageConstants.SPACE3d);
  };

  return (
    <AuthContext.Provider
      value={{
        authenticationDetails,
        login,
        logout,
        cookies,
        handleCookie,
        progress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
