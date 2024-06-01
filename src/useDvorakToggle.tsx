import { createContext, useContext } from "react";

export const DvorakToggleContext = createContext(false);

export const useDvorakToggle = () => {
  return useContext(DvorakToggleContext);
};
