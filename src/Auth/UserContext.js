import { createContext, useEffect, useState } from "react";
import { isAuthenticated } from "./AuthService";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    user: {},
    auth: false,
  });

  useEffect(() => {
    const checkLoggedIn = () => {
      let activeUser = isAuthenticated();
      let isAuth = true;
      if (!activeUser) {
        localStorage.setItem("user", "");
        activeUser = {};
        isAuth = false;
      }

      setCurrentUser({ ...currentUser, user: activeUser, auth: isAuth });
    };
    checkLoggedIn();
  }, []);

  const logout = (user) => {
    setCurrentUser({ ...currentUser, user, auth: true });
  };

  const loginDetail = (user) => {
    setCurrentUser({ ...currentUser, user, auth: true });
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        logout,
        loginDetail,
        setCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
