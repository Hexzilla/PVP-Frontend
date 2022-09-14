import React from "react";

export const TezosContext = React.createContext<TezosContextValue>({});

if (process.env.NODE_ENV !== "production") {
  TezosContext.displayName = "TezosContext";
}

export default TezosContext;
