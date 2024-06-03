import { useMemo, useState } from "react";
import * as SC2 from "./SC2";

const RACES = {
  [SC2.TERRAN]: {
    value: SC2.TERRAN as SC2.Race,
    icon: "Terran.png",
    label: "Terran",
  },
  [SC2.PROTOSS]: {
    value: SC2.PROTOSS as SC2.Race,
    icon: "Protoss.png",
    label: "Protoss",
  },
  [SC2.ZERG]: {
    value: SC2.ZERG as SC2.Race,
    icon: "Zerg.png",
    label: "Zerg",
  },
}

export const SC2LayerSelect = ({ setLayer }: { setLayer: (layer: string) => void }) => {
  const [race, setRace] = useState<SC2.Race>(SC2.TERRAN);

  const buildings = useMemo(() => {
    return Object.entries(SC2.BUILDINGS).map(b => ({
      name: b[0],
      layer: `b/${b[0]}`,
      icon: b[1].icon,
      race: b[1].race as SC2.Race,
    })).filter(b => b.icon != null && b.icon !== "" && b.race === race).sort(raceAlphaSort);
  }, [SC2.BUILDINGS, race]);

  const units = useMemo(() => {
    return Object.entries(SC2.UNITS).map(u => ({
      name: u[0],
      layer: `u/${u[0]}`,
      icon: u[1].icon,
      race: u[1].race as SC2.Race,
    })).filter(u => u.icon != null && u.icon !== "" && u.race === race).sort(raceAlphaSort);
  }, [SC2.UNITS, race]);

  return (
    <div style={{
      marginBottom: "15px",
    }}>
      {Object.keys(RACES).map(rKey => {
        const r = RACES[rKey as unknown as keyof typeof RACES];
        return (
          <button key={rKey} style={{
            background: "black",
            margin: "4px",
          }} onClick={() => setRace(r.value)}>
            <img src={`icons/${r.icon}`} style={{
              width: "48px",
            }} />
          </button>
        );
      })}
      <br />
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
      <button style={{
        background: "black",
        margin: "4px",
      }} onClick={() => setLayer(`basic/${race}`)}>
        <img src="icons/Build.png" style={{
          width: "48px",
        }} />
      </button>
      <button style={{
        background: "black",
        margin: "4px",
      }} onClick={() => setLayer(`advanced/${race}`)}>
        <img src="icons/BuildAdvanced.png" style={{
          width: "48px",
        }} />
      </button>
      {race === SC2.PROTOSS && (
      <button style={{
        background: "black",
        margin: "4px",
      }} onClick={() => setLayer("hallucination")}>
        <img src="icons/Hallucination.png" style={{
          width: "48px",
        }} />
      </button>
      )}
      {race === SC2.ZERG && (
      <button style={{
        background: "black",
        margin: "4px",
      }} onClick={() => setLayer("larva")}>
        <img src="icons/larva.jpg" style={{
          width: "48px",
        }} />
      </button>
      )}
    </div>
  );
};

const raceAlphaSort = (a: { name: string; race: SC2.Race }, b: { name: string; race: SC2.Race }) => {
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
