import { ChangeEvent, useCallback, useState } from "react";
import { Keyboard_RK80 } from "./keyboards/RK80"
import { Keyboard_Standard75 } from "./keyboards/Standard75";
import { Keyboard_Standard80 } from "./keyboards/Standard80";
import { DvorakToggleContext } from "./useDvorakToggle";

const KEYBOARDS = {
  "RK80": <Keyboard_RK80 />,
  "Standard 75%": <Keyboard_Standard75 />,
  "Standard 80%": <Keyboard_Standard80 />,
};

export const Layout = () => {
  const [keyboard, setKeyboard] = useState<keyof typeof KEYBOARDS>("RK80");
  const [dvorak, setDvorak] = useState(false);

  return (
    <div style={{
      background: "#080808",
      display: "flex",
      flexFlow: "column nowrap",
      height: "100vh",
      width: "100vw",
      maxHeight: "100vh",
    }}>
      <div style={{
        color: "white",
        fontSize: "16px",
        padding: "1em",
      }}>
        <KeyboardSelector value={keyboard} onChange={setKeyboard} />
        <div style={{ display: "inline-block", width: "2em" }} />
        <DvorakToggle value={dvorak} onChange={setDvorak} />
      </div>
      <DvorakToggleContext.Provider value={dvorak}>
        {KEYBOARDS[keyboard]}
      </DvorakToggleContext.Provider>
    </div>
  );
};

export const KeyboardSelector = ({ value, onChange }: { value: keyof typeof KEYBOARDS; onChange: (val: keyof typeof KEYBOARDS) => void }) => {
  const _onChange = useCallback((ev: ChangeEvent<HTMLSelectElement>) => {
    onChange(ev.target.value as any);
  }, []);

  return (
    <>
      <label>Layout</label>
      &nbsp;
      <select value={value} onChange={_onChange}>
        {Object.keys(KEYBOARDS).map((kb, i) => (
          <option key={i}>{kb}</option>
        ))}
      </select>
    </>
  );
};

export const DvorakToggle = ({ value, onChange }: { value: boolean; onChange: (val: boolean) => void }) => {
  const _onChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    onChange(ev.target.checked);
  }, [onChange]);

  return (
    <span style={{
      userSelect: "none",
    }}>
      <label htmlFor="dvorak">Dvorak</label>
      <input type="checkbox" id="dvorak" onChange={_onChange} checked={value} />
    </span>
  );
};
