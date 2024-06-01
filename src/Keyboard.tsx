import { useEffect, useMemo, useRef, useState } from "react";
import { KEY, KEYMAP } from "./keymap";
import { useKeyState } from "./useKeyState";
import { useDvorakToggle } from "./useDvorakToggle";

type KeyboardRowLayout = Array<string | number | [string, number]>;

export const Keyboard = ({ firstRowGap, layout, width }: {
  firstRowGap?: number;
  layout: Array<KeyboardRowLayout>;
  width: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [em, setEm] = useState(0);

  const height = layout.length + (firstRowGap ?? 0);

  const resizeObserver = useMemo(() => new ResizeObserver(entries => {
    const { inlineSize, blockSize } = entries[0].contentBoxSize[0];
    setEm(Math.min(inlineSize / width, blockSize / height));
  }), [setEm, width, height]);

  useEffect(() => {
    const div = ref.current;
    if (div != null) {
      resizeObserver.observe(div);
      return () => resizeObserver.unobserve(div);
    }
  }, [ref.current]);

  return (
    <>
      <div ref={ref} style={{
        alignItems: "center",
        fontSize: `${em}px`,
        display: "flex",
        flexFlow: "column nowrap",
        flexGrow: 1,
        height: 0,
      }}>
        {layout.map((row, i) => (
          <KeyboardRow key={i} layout={row} marginBottom={i === 0 ? firstRowGap : undefined} width={width} />
        ))}
      </div>
    </>
  )
};

const KeyboardRow = ({ layout, marginBottom, width }: { layout: KeyboardRowLayout; marginBottom?: number; width: number }) => {
  return (
    <div style={{
      display: "flex",
      flexFlow: "row nowrap",
      marginBottom: marginBottom && `${marginBottom}em`,
      width: `${width}em`,
    }}>
      {layout.map((key, i) => {
        if (typeof key === "number") {
          return <div key={i} style={{
            height: "1em",
            width: `${key}em`,
          }} />;
        }

        if (typeof key === "string") {
          return <Key key={i} k={key} size={1} />;
        }

        return <Key key={i} k={key[0]} size={key[1]} />;
      })}
    </div>
  )
};

const Key = ({ k, size }: { k?: KEY, size: number }) => {
  const PADDING = 0.04;

  const key = k ? KEYMAP[k] : null;

  const pressed = useKeyState(key?.code);

  const dv = useDvorakToggle();
  const label = (dv && key?.dv != null && KEYMAP[key.dv] != null) ? KEYMAP[key.dv].label : key?.label;
  const usable = key != null && key.usable !== false;

  return (
    <div style={{
      padding: `${PADDING}em`,
      height: `${1 - 2 * PADDING}em`,
      width: `${size - 2 * PADDING}em`,
    }}>
      <div style={{
        background: pressed ? "#84c" : (usable ? "#118" : "#080822"),
        height: "100%",
        position: "relative",
        width: "100%",
      }}>
        <span style={{
          color: "#ffa",
          fontSize: "0.25em",
          left: "0.1em",
          position: "absolute",
          top: "-0.1em",
        }}>{label}</span>
      </div>
    </div>
  );
};