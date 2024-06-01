import { useMemo } from "react";
import * as SC2 from "./SC2";

export const SC2Controls = ({ setLayer }: { setLayer: (layer: string) => void }) => {
  const buildings = useMemo(() => {
    return Object.entries(SC2.BUILDINGS).map(b => ({
      name: b[0],
      layer: `b/${b[0]}`,
      icon: b[1].icon,
      race: b[1].race as SC2.Race,
    })).filter(b => b.icon != null && b.icon !== "").sort(raceAlphaSort);
  }, [SC2.BUILDINGS]);

  const units = useMemo(() => {
    return Object.entries(SC2.UNITS).map(u => ({
      name: u[0],
      layer: `u/${u[0]}`,
      icon: u[1].icon,
      race: u[1].race as SC2.Race,
    })).filter(u => u.icon != null && u.icon !== "").sort(raceAlphaSort);
  }, [SC2.UNITS]);

  return (
    <div style={{
      marginBottom: "15px",
    }}>
      {buildings.map(b => (
        <button key={b.layer} style={{
          background: "black",
          margin: "4px",
        }} onClick={() => setLayer(b.layer)}>
          <img src={`icons/${b.icon}`} style={{
            width: "48px",
          }} />
        </button>
      ))}
      <br />
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
      <br />
      <button onClick={() => setLayer(`basic/${SC2.TERRAN}`)}>Terran Basic</button>
      <button onClick={() => setLayer(`advanced/${SC2.TERRAN}`)}>Terran Adv</button>
      <button onClick={() => setLayer(`basic/${SC2.PROTOSS}`)}>Protoss Basic</button>
      <button onClick={() => setLayer(`advanced/${SC2.PROTOSS}`)}>Protoss Adv</button>
      <button onClick={() => setLayer(`basic/${SC2.ZERG}`)}>Zerg Basic</button>
      <button onClick={() => setLayer(`advanced/${SC2.ZERG}`)}>Zerg Adv</button>
      <button onClick={() => setLayer("larva")}>Larva</button>
    </div>
  );
};

const raceAlphaSort = (a: {name: string; race: SC2.Race}, b: {name: string; race: SC2.Race}) => {
  if (a.race < b.race) {
    return -1;
  }
  if (a.race > b.race) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}
