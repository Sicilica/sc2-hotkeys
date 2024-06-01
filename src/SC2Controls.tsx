import { useMemo } from "react";
import * as SC2 from "./SC2";

export const SC2Controls = ({setLayer}: {setLayer: (layer: string) => void}) => {
  const units = useMemo(() => {
    return Object.entries(SC2.UNITS).map(u => ({
      layer: `unit::${u[0]}`,
      icon: u[1].icon,
    })).filter(u => u.icon != null && u.icon !== "");
  }, [SC2.UNITS]);

  return (
    <div style={{
      marginBottom: "15px",
    }}>
      {units.map(u => (
        <button key={u.layer} style={{
          background: "black",
          margin: "4px",
        }} onClick={() => setLayer(u.layer)}>
          <img src={`icons/${u.icon}`} style={{
            width: "48px",
          }} />
        </button>
      ))}
    </div>
  );
};
