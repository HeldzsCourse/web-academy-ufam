"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext<{
  email: string | null;
  login: (email: string) => void;
  logout: () => void;
}>({
  email: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [email, setEmail] = useState<string | null>(null);

  const login = (email: string) => {
    setEmail(email);
    localStorage.setItem("user", email);
  };

  const logout = () => {
    setEmail(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("user");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
