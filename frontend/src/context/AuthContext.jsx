import { useState, createContext } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const getUserData = (userToken) => {
    if (!userToken) {
      return null;
    }

    try {
      return jwtDecode(userToken);
    } catch (error) {
      return null;
    }
  };

  const user = getUserData(token);

  const logIn = (userToken) => {
    localStorage.setItem("token", userToken);

    setToken(userToken);
  };

  const logOut = () => {
    localStorage.removeItem("token");

    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        roleId: user?.roleId,
        baseId: user?.baseId,
        logIn,
        logOut,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

