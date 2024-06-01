import { Keyboard } from "../Keyboard";

export const Keyboard_RK80 = () => {
  return <Keyboard width={15} firstRowGap={0.25} layout={[
    ["esc", 0.25, "f1", "f2", "f3", "f4", 0.25, "f5", "f6", "f7", "f8", 0.25, "f9", "f10", "f11", "f12", 0.25, "del"],
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", ["back", 2]],
    [["tab", 1.5], "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", ["\\", 1.5]],
    [["caps", 1.75], "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", ["enter", 2.25]],
    [["shiftL", 2.25], "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", ["shiftR", 1.75], 1],
    [["ctrlL", 1.25], ["superL", 1.25], ["altL", 1.25], ["space", 6.25], "altR", "superR", "ctrlR", 2],
  ]} />;
};
