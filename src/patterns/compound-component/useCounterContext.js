import React from "react";

// a centralized place to handle counter related business logic
// template code for using context
const CounterContext = React.createContext(undefined);

// a wrapper function which can be configurable from consumer
function CounterProvider({ children, value }) {
  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
}

// to return the counter context
function useCounterContext() {
  // initiate the context
  const context = React.useContext(CounterContext);
  if (context === undefined) {
    throw new Error("useCounterContext must be used within a CounterProvider");
  }
  return context;
}

export { CounterProvider, useCounterContext };
