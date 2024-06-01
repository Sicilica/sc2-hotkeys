import { Keyboard } from "../Keyboard";

export const Keyboard_Standard80 = () => {
  return <Keyboard width={15} firstRowGap={0.25} layout={[
    ["esc", 1, "f1", "f2", "f3", "f4", 0.5, "f5", "f6", "f7", "f8", 0.5, "f9", "f10", "f11", "f12"],
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", ["back", 2]],
    [["tab", 1.5], "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", ["\\", 1.5]],
    [["caps", 1.75], "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", ["enter", 2.25]],
    [["shiftL", 2.25], "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", ["shiftR", 2.75],],
    [["ctrlL", 1.25], ["superL", 1.25], ["altL", 1.25], ["space", 6.25], ["altR", 1.25], ["superR", 1.25], ["menu", 1.25], ["ctrlR", 1.25]],
  ]} />;
};
