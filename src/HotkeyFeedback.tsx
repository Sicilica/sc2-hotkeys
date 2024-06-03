import { useCallback, useEffect, useState } from "react";
import { Hotkey } from "./HotkeyProfile";

export const HotkeyFeedback = ({ hotkeyEvent }: { hotkeyEvent: EventTarget }) => {
  const [msg, setMsg] = useState("-");
  const [active, setActive] = useState(false);

  const onHotkey = useCallback((ev: CustomEvent) => {
    const hk: Hotkey = ev.detail.hotkey;
    setMsg(hk.name ?? JSON.stringify(hk));
    setActive(true);
  }, [setMsg, setActive]);

  useEffect(() => {
    hotkeyEvent.addEventListener("hotkey", onHotkey as any);
    return () => {
      hotkeyEvent.removeEventListener("hotkey", onHotkey as any);
    };
  }, [hotkeyEvent, onHotkey]);

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setActive(false), 2_000);
      return () => {
        clearTimeout(t);
      }
    }
  }, [active, msg, setActive]);

  return (
    <div>
      <span style={{
        color: "white",
        opacity: active ? 1 : 0,
        transition: "all 250ms linear",
      }}>{msg}</span>
    </div>
  );
};