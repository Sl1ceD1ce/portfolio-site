import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";

export type PopupType = "About" | "Projects";

interface PopupContextType {
  popups: Record<PopupType, boolean>;
  openPopup: (popup: PopupType) => void;
  closePopup: (popup: PopupType) => void;
  closeAll: () => void;
}

const PopupContext = createContext<PopupContextType | null>(null);

export const usePopupContext = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopupContext must be used within a PopupProvider");
  }
  return context;
};

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [popups, setPopups] = useState<Record<PopupType, boolean>>({
    About: false,
    Projects: false,
  });

  const openPopup = (popup: PopupType) =>
    setPopups((prev) => ({ ...prev, [popup]: true }));

  const closePopup = (popup: PopupType) =>
    setPopups((prev) => ({ ...prev, [popup]: false }));

  const closeAll = () => setPopups({ About: false, Projects: false });

  const contextValue: PopupContextType = {
    popups,
    openPopup,
    closePopup,
    closeAll,
  };

  return (
    <PopupContext.Provider value={contextValue}>
      {children}
    </PopupContext.Provider>
  );
};
