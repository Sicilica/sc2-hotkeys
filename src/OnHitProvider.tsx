import { createContext } from "react";

export const OnHitContext = createContext<EventTarget>(new EventTarget());
