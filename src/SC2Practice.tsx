import { useCallback, useEffect, useMemo, useState } from "react";
import * as SC2 from "./SC2";
import { Hotkey } from "./HotkeyProfile";

export const SC2Practice = ({ hotkeyEvent, setLayer: reportLayer }: { hotkeyEvent: EventTarget; setLayer: (layer: string) => void }) => {
  const [challenge, setChallenge] = useState({ hotkey: {} as Hotkey, layer: "", race: SC2.TERRAN });
  const [layer, setLayer] = useState("");
  const [failed, setFailed] = useState(true);
  const [successCount, setSuccessCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);

  const challengePool = useMemo(() => CHALLENGES.filter(c => c.type === "building"), []);

  const nextChallenge = useCallback(() => {
    let c = challenge;
    for (let i = 0; i < 10; i++) {
      c = challengePool[Math.floor(Math.random() * challengePool.length)];
      if (c !== challenge) {
        break;
      }
    }
    setChallenge(c);
    setLayer(c.layer);
    setFailed(false);
  }, [challenge, setChallenge, setLayer, setFailed]);

  const onHotkey = useCallback((ev: CustomEvent) => {
    const hk: Hotkey = ev.detail.hotkey;

    switch (hk) {
      case SC2.ABILITIES.build:
        setLayer(`basic/${challenge.race}`);
        return;
      case SC2.ABILITIES.buildAdvanced:
        setLayer(`advanced/${challenge.race}`);
        return;
      case SC2.ABILITIES.cancel:
        setLayer(challenge.layer);
        return;
    }

    if (hk === challenge.hotkey) {
      if (!failed) {
        setSuccessCount(c => c + 1);
      }
      nextChallenge();
    } else if (!failed) {
      setFailed(true);
      setFailedCount(c => c + 1);
    }
  }, [setLayer, challenge, failed, nextChallenge, setFailed, setSuccessCount, setFailedCount]);

  useEffect(() => {
    hotkeyEvent.addEventListener("hotkey", onHotkey as any);
    return () => {
      hotkeyEvent.removeEventListener("hotkey", onHotkey as any);
    };
  }, [hotkeyEvent, onHotkey]);

  useEffect(() => {
    reportLayer(layer);
  }, [layer, reportLayer]);

  useEffect(() => {
    nextChallenge();
  }, []);

  return (
    <div style={{
      color: "white",
    }}>
      <span>{challenge.hotkey.name ?? JSON.stringify(challenge.hotkey)}</span>
      <div>
        <span>Success: {successCount}</span>
        &nbsp;
        <span>Failed: {failedCount}</span>
      </div>
    </div>
  );
};

const CHALLENGES: Array<{
  layer: string;
  hotkey: Hotkey;
  race: SC2.Race;
  type: "ability" | "building" | "unit" | "upgrade";
}> = [];

for (const bKey in SC2.BUILDINGS) {
  const b = (SC2.BUILDINGS as Record<string, SC2.Building>)[bKey];
  if (b.build != null) {
    let layer;
    switch (b.race) {
      case SC2.TERRAN:
        layer = "u/scv";
        break;
      case SC2.PROTOSS:
        layer = "u/probe";
        break;
      case SC2.ZERG:
        layer = "u/drone";
        break;
    }
    CHALLENGES.push({
      hotkey: b,
      layer,
      race: b.race,
      type: "building",
    });
  }

  for (const a of Object.values(b.abilities ?? {})) {
    CHALLENGES.push({
      hotkey: a,
      layer: `b/${bKey}`,
      race: b.race,
      type: "ability",
    });
  }
}

for (const uKey in SC2.UNITS) {
  const u = (SC2.UNITS as Record<string, SC2.Unit>)[uKey];
  if (u.building != null) {
    CHALLENGES.push({
      hotkey: u,
      layer: u.building === "larva" ? u.building : `b/${u.building}`,
      race: u.race,
      type: "unit",
    });
  }

  for (const a of Object.values(u.abilities ?? {})) {
    CHALLENGES.push({
      hotkey: a,
      layer: `u/${uKey}`,
      race: u.race,
      type: "ability",
    });
  }
}

for (const uKey in SC2.UPGRADES) {
  const u = (SC2.UPGRADES as Record<string, SC2.Upgrade>)[uKey];
  if (u.building != null) {
    CHALLENGES.push({
      hotkey: u,
      layer: `b/${u.building}`,
      race: u.race,
      type: "upgrade",
    });
  }
}
