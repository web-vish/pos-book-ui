import React, { createContext, useState, type Context } from "react";
import type { PositionSummaryParam } from "../types";

export interface AppContextValue{
    positions: PositionSummaryParam[] | [];
    updateContext?: (value?:PositionSummaryParam[] | []) => void;
}

export interface AppContextType {
  value?: AppContextValue;
  children?: React.ReactNode;
}

const AppContext: Context<AppContextValue> = createContext({
  positions: [],
  updateContext: () => {},
} as AppContextValue);

const AppProvider: React.FC<AppContextType> = ({
  children,
}: AppContextType) => {
  const [appState, setAppState] = useState<PositionSummaryParam[] | []>([]);
  const updateContext = (positions?: PositionSummaryParam[] | []) => {
    setAppState(positions ?? []);
  };

  return (
    <AppContext.Provider value={{ positions: appState, updateContext }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
