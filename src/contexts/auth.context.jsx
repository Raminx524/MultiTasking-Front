import React, { createContext, useContext, useEffect, useState } from "react";
import { formatJWTTokenToUser } from "../utils/utils";
import axios from "axios";
const USER_URL = "http://localhost:3000/api/auth/";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const login = (userInfo) => {
    setUser(userInfo);
  };
  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function getUserByToken() {
      try {
        const { userId } = formatJWTTokenToUser(token);
        const userRes = await axios.get(USER_URL + userId, {
          headers: { Authorization: token },
        });
        login(userRes.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    if (token) {
      getUserByToken();
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("This context should only be used inside UserProvider");
  }
  return context;
}
