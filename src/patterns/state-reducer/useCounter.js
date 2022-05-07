import { useReducer } from "react";

const internalReducer = ({ count }, { type, payload }) => {
  switch (type) {
    case "increment":
      return {
        count: Math.min(count + 1, payload.max)
      };
    case "decrement":
      return {
        count: Math.max(0, count - 1)
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

function useCounter({ initial, max }, reducer = internalReducer) {
  // useReducer return the state object and dispatch fuction
  // dispatch function will in charge of handling event with {type and playload} provide
  // dispatch the event to the reducer
  const [{ count }, dispatch] = useReducer(reducer, { count: initial });

  const handleIncrement = () => {
    dispatch({ type: "increment", payload: { max } });
  };

  const handleDecrement = () => {
    dispatch({ type: "decrement" });
  };

  return {
    count,
    handleIncrement,
    handleDecrement
  };
}

useCounter.reducer = internalReducer;
useCounter.types = {
  increment: "increment",
  decrement: "decrement"
};

export { useCounter };
