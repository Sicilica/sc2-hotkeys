import { Keyboard } from "../Keyboard";

export const Keyboard_Standard75 = () => {
  return <Keyboard width={16} layout={[
    ["esc", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11", "f12", "print", "pause", "del"],
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", ["back", 2], "home"],
    [["tab", 1.5], "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", ["\\", 1.5], "end"],
    [["caps", 1.75], "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", ["enter", 2.25], "pgup"],
    [["shiftL", 2.25], "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", ["shiftR", 1.75], "up", "pgdn"],
    [["ctrlL", 1.25], ["superL", 1.25], ["altL", 1.25], ["space", 6.25], "altR", "superR", "ctrlR", "left", "down", "right"],
  ]} />;
};
