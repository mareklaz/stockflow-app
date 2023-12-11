import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import http from "../services/axiosService";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const response = await http.get("/auth/get-user");
      setUser(response);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await http.post("/auth/login", {
        email,
        password,
      });
      const { token } = response;
      localStorage.setItem("token", token);
      await getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    const navigate = useNavigate();
    navigate("/login");
  };

  const getToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        logout();
      } else {
        try {
          await getUser();
        } catch (error) {
          console.error("Error al obtener el usuario:", error);
        }
      }
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
