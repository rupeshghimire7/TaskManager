import { useState, useEffect, createContext } from "react";
import axiosInstance from "../utils/api";

export const AuthContext = createContext({ user: {}, isLoggedIn: false, login: (token: string) => { }, logout: () => { } });

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      axiosInstance
        .get("/user", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    // Fetch user data based on the token
    axiosInstance
      .get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser({});
    setIsLoggedIn(false);
  };

  return (
    <>
      <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
