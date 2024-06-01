import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Keyboard_RK80 } from "./keyboards/RK80"
import { Keyboard_Standard75 } from "./keyboards/Standard75";
import { Keyboard_Standard80 } from "./keyboards/Standard80";
import { DvorakToggleContext } from "./useDvorakToggle";
import { Core6 } from "./profiles/Core6";
import { HotkeysContext } from "./useHotkey";
import { SC2Controls } from "./SC2Controls";

const KEYBOARDS = {
  "RK80": <Keyboard_RK80 />,
  "Standard 75%": <Keyboard_Standard75 />,
  "Standard 80%": <Keyboard_Standard80 />,
};

const PROFILES = {
  "The Core 6": Core6,
};

export const Layout = () => {
  const [keyboard, setKeyboard] = useState<keyof typeof KEYBOARDS>("RK80");
  const [dvorak, setDvorak] = useState(false);
  const [profile, setProfile] = useState<keyof typeof PROFILES>("The Core 6");
  const [layer, setLayer] = useState("");

  useEffect(() => {
    console.log(PROFILES[profile]);
  }, [profile]);

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
        <div style={{ display: "inline-block", width: "2em" }} />
        <ProfileSelector value={profile} onChange={setProfile} />
      </div>
      <SC2Controls setLayer={setLayer} />
      <DvorakToggleContext.Provider value={dvorak}>
        <HotkeysContext.Provider value={PROFILES[profile].layers[layer] ?? { keys: {} }}>
          {KEYBOARDS[keyboard]}
        </HotkeysContext.Provider>
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
      <label>Keyboard</label>
      &nbsp;
      <select value={value} onChange={_onChange}>
        {Object.keys(KEYBOARDS).map((kb, i) => (
          <option key={i}>{kb}</option>
        ))}
      </select>
    </>
  );
};

export const ProfileSelector = ({ value, onChange }: { value: keyof typeof PROFILES; onChange: (val: keyof typeof PROFILES) => void }) => {
  const _onChange = useCallback((ev: ChangeEvent<HTMLSelectElement>) => {
    onChange(ev.target.value as any);
  }, []);

  return (
    <>
      <label>Profile</label>
      &nbsp;
      <select value={value} onChange={_onChange}>
        {Object.keys(PROFILES).map((kb, i) => (
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
