export interface HotkeyProfile {
  layers: Record<string, HotkeyLayer>;
}

export interface HotkeyLayer {
  keys: Record<string, Hotkey>;
}

export interface Hotkey {
  icon?: string;
}
