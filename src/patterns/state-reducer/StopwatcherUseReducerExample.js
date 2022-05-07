import { useReducer, useEffect, useRef } from "react";


// https://dmitripavlutin.com/react-usereducer/
// action object/element -> dispatch action -> reducer -> new state
const initialState = {
  isRunning: false,
  time: 0
};

export default function Stopwatch() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // use ref to preserve the value over each render
  const idRef = useRef(0);
  // let myInterval = null


  // listen to isRunning changes only
  useEffect(() => {
    // if is not running, return directly, the running callback will be executed
    if (!state.isRunning) {
      return;
    }
    
    // if is running, set an interval and dispatch the tick action every 1 second
    // attach a callback to clear the interval when the state changed to stop
    // assign mutable value to current property
    idRef.current = setInterval(() => dispatch({ type: "tick" }), 1000);
    
    return () => {
      console.log('useEffect callback', idRef.current, state.isRunning)
      clearInterval(idRef);
      idRef.current = 0;
    };
  }, [state.isRunning]);

  return (
    <div className="stopwatch">
      {state.time}s
      <div>
        <button onClick={() => dispatch({ type: "start" })}>Start</button>
        <button onClick={() => dispatch({ type: "stop" })}>Stop</button>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      </div>
    </div>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "start":
      return { ...state, isRunning: true };
    case "stop":
      return { ...state, isRunning: false };
    case "reset":
      return { isRunning: false, time: 0 };
    case "tick":
      return { ...state, time: state.time + 1 };
    default:
      throw new Error();
  }
}
