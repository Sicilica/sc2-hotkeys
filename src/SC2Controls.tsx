import { useState } from "react";
import { SC2LayerSelect } from "./SC2LayerSelect";
import { SC2Practice } from "./SC2Practice";

const MODE = {
  PRACTICE: 1,
  REFERENCE: 2,
};

export const SC2Controls = ({ onHit, setLayer }: { onHit: EventTarget, setLayer: (layer: string) => void }) => {
  const [mode, setMode] = useState(MODE.REFERENCE);

  return (
    <div>
      <div>
        <label style={{ color: "white" }}>Mode:</label>
        &nbsp;
        <button onClick={() => setMode(MODE.PRACTICE)}>Practice</button>
        &nbsp;
        <button onClick={() => setMode(MODE.REFERENCE)}>Reference</button>
      </div>
      {mode === MODE.PRACTICE && (
        <SC2Practice setLayer={setLayer} hotkeyEvent={onHit} />
      )}
      {mode === MODE.REFERENCE && (
        <SC2LayerSelect setLayer={setLayer} />
      )}
    </div>
  );
};