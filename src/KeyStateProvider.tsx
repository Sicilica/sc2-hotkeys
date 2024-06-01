import { PropsWithChildren, createContext, useCallback, useEffect, useState } from "react";

export const KeyStateContext = createContext<Record<string, boolean | undefined>>({});

export const KeyStateProvider = ({ children }: PropsWithChildren) => {
  const [value, setValue] = useState<Record<string, boolean | undefined>>({});

  const onBlur = useCallback(() => {
    if (!document.hasFocus()) {
      setValue({});
    }
    setValue({});
  }, [setValue]);

  const onKeyDown = useCallback((ev: KeyboardEvent) => {
    ev.preventDefault();
    setValue(v => ({
      ...v,
      [ev.code]: true,
    }));
  }, [setValue]);

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