import { PropsWithChildren, createContext, useCallback, useEffect, useState } from "react";

export const KeyStateContext = createContext<Record<string, boolean | undefined>>({});

export const KeyStateProvider = ({ children, onHit }: PropsWithChildren<{ onHit?: (code: string) => void; }>) => {
  const [value, setValue] = useState<Record<string, boolean | undefined>>({});

  const onBlur = useCallback(() => {
    if (!document.hasFocus()) {
      setValue({});
    }
    setValue({});
  }, [setValue]);

  const onKeyDown = useCallback((ev: KeyboardEvent) => {
    ev.preventDefault();
    if (ev.repeat) {
      // This isn't working for me atm (probably some xwayland nonsense?)
      return;
    }
    setValue(v => ({
      ...v,
      [ev.code]: true,
    }));
    onHit && onHit(ev.code);
  }, [setValue, onHit]);

  const onKeyUp = useCallback((ev: KeyboardEvent) => {
    ev.preventDefault();
    setValue(v => ({
      ...v,
      [ev.code]: false,
    }));
  }, [setValue]);

  useEffect(() => {
    window.addEventListener("blur", onBlur);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [onBlur, onKeyDown, onKeyUp]);

  return (
    <KeyStateContext.Provider value={value}>
      {children}
    </KeyStateContext.Provider>
  );
};