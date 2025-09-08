import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";

interface UserContextType {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  toggleTheme: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};

interface UserContextProviderProps {
  children: ReactNode;
}

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const [darkMode, setDarkMode] = useState(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? true
      : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const contextValue: UserContextType = {
    darkMode,
    setDarkMode,
    toggleTheme,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {" "}
      {children}
    </UserContext.Provider>
  );
}
