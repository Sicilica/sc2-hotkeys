import { createContext, useContext } from "react";
import { HotkeyLayer } from "./HotkeyProfile";

export const HotkeysContext = createContext<HotkeyLayer>({ keys: {} });

export const useHotkey = (key?: string) => {
  const layer = useContext(HotkeysContext);
  if (key == null) {
    return null;
  }
  return layer.keys[key];
};
