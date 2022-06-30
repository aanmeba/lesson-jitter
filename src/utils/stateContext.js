import { createContext, useContext } from "react";

export const StateContext = createContext();
// make state available all over the app
export const useGlobalState = () => useContext(StateContext);
