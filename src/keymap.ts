export type KEY = string;

export const codeToKey = (code: string) => {
  return INV_KEYMAP[code];
};

export const KEYMAP: Record<KEY, {
  code: string;
  label: string;
  dv?: string;
}> = {
  ",": {
    code: "Comma",
    label: ",",
    dv: "w",
  },
  ".": {
    code: "Period",
    label: ".",
    dv: "v",
  },
  "/": {
    code: "Slash",
    label: "/",
    dv: "z",
  },
  ";": {
    code: "Semicolon",
    label: ";",
    dv: "s",
  },
  "'": {
    code: "Quote",
    label: "'",
    dv: "-",
  },
  "-": {
    code: "Minus",
    label: "-",
    dv: "[",
  },
  "=": {
    code: "Equal",
    label: "=",
    dv: "]",
  },
  "[": {
    code: "BracketLeft",
    label: "[",
    dv: "/",
  },
  "]": {
    code: "BracketRight",
    label: "]",
    dv: "=",
  },
  "\\": {
    code: "Backslash",
    label: "\\",
  },
  "back": {
    code: "Backspace",
    label: "Backspace",
  },
  "esc": {
    code: "Escape",
    label: "Esc",
  },
  "left": {
    code: "ArrowLeft",
    label: "←",
  },
  "right": {
    code: "ArrowRight",
    label: "→",
  },
  "up": {
    code: "ArrowUp",
    label: "↑",
  },
  "down": {
    code: "ArrowDown",
    label: "↓",
  },
  "del": {
    code: "Delete",
    label: "Del",
  },
  "home": {
    code: "Home",
    label: "Home",
  },
  "pgup": {
    code: "PageUp",
    label: "PgUp",
  },
  "pgdn": {
    code: "PageDown",
    label: "PgDn",
  },
  "`": {
    code: "Backquote",
    label: "`",
  },
  "tab": {
    code: "Tab",
    label: "Tab",
  },
  "caps": {
    code: "CapsLock",
    label: "Caps Lock",
  },
  "enter": {
    code: "Enter",
    label: "Enter",
  },
  "space": {
    code: "Space",
    label: "",
  },
  "shiftL": {
    code: "ShiftLeft",
    label: "Shift",
  },
  "shiftR": {
    code: "ShiftRight",
    label: "Shift",
  },
  "ctrlL": {
    code: "ControlLeft",
    label: "Ctrl",
  },
  "ctrlR": {
    code: "ControlRight",
    label: "Ctrl",
  },
  "altL": {
    code: "AltLeft",
    label: "Alt",
  },
  "altR": {
    code: "AltRight",
    label: "Alt",
  },
  "superL": {
    code: "MetaLeft",
    label: "⌘",
  },
  "superR": {
    code: "MetaRight",
    label: "⌘",
  },
};

for (let i = 0; i <= 9; i++) {
  KEYMAP[i] = {
    code: `Digit${i}`,
    label: `${i}`,
  };
}

for (let i = 1; i <= 12; i++) {
  KEYMAP[`f${i}`] = {
    code: `F${i}`,
    label: `F${i}`,
  };
}

for (let i = 0; i < 26; i++) {
  const c = String.fromCharCode('a'.charCodeAt(0) + i);
  const C = c.toUpperCase();
  KEYMAP[c] = {
    code: `Key${C}`,
    label: C,
  };
}
KEYMAP.a.dv = "a";
KEYMAP.b.dv = "x";
KEYMAP.c.dv = "j";
KEYMAP.d.dv = "e";
KEYMAP.e.dv = ".";
KEYMAP.f.dv = "u";
KEYMAP.g.dv = "i";
KEYMAP.h.dv = "d";
KEYMAP.i.dv = "c";
KEYMAP.j.dv = "h";
KEYMAP.k.dv = "t";
KEYMAP.l.dv = "n";
KEYMAP.m.dv = "m";
KEYMAP.n.dv = "b";
KEYMAP.o.dv = "r";
KEYMAP.p.dv = "l";
KEYMAP.q.dv = "'";
KEYMAP.r.dv = "p";
KEYMAP.s.dv = "o";
KEYMAP.t.dv = "y";
KEYMAP.u.dv = "g";
KEYMAP.v.dv = "k";
KEYMAP.w.dv = ",";
KEYMAP.x.dv = "q";
KEYMAP.y.dv = "f";
KEYMAP.z.dv = ";";

const INV_KEYMAP: Record<string, KEY> = {};
if (Object.keys(INV_KEYMAP == null).length === 0) {
  for (const k in KEYMAP) {
    INV_KEYMAP[KEYMAP[k].code] = k;
  }
}