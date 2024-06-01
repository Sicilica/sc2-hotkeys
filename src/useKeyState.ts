import { useContext } from "react";
import { KeyStateContext } from "./KeyStateProvider";


export const useKeyState = (code?: string) => {
  const states = useContext(KeyStateContext);
  if (code == null) {
    return false;
  }
  return states[code];
};
