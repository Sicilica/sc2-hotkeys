import { createContext, useContext } from "react";
import { Hotkey, HotkeyProfile } from "./HotkeyProfile";

export const HotkeysContext = createContext<{
  profile: HotkeyProfile;
  layer: string;
}>({ profile: { layers: {} }, layer: "" });

export const useHotkey = (key?: string) => {
  const { profile, layer } = useContext(HotkeysContext);
  if (key == null) {
    return null;
  }
  return resolveHotkey(profile, layer, key);
};

const resolveHotkey = (profile: HotkeyProfile, layer: string, key: string): Hotkey | null => {
  const l = profile.layers[layer];
  if (l == null) {
    return null;
  }
  if (l.keys[key] != null) {
    return l.keys[key];
  }
  if (l.parent != null) {
    return resolveHotkey(profile, l.parent, key);
  }
  return null;
};
