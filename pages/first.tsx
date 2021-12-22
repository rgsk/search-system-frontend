import { useState } from "react";

const First = () => {
  console.log("First rerender");
  const [counter, setCounter] = useState(0);
  const handleIncrement = () => {
    setTimeout(() => {
      setCounter(counter + 1);
    });
    setTimeout(() => {
      setCounter(counter + 1);
    });
    setTimeout(() => {
      setCounter(counter + 1);
    });
  };
  const handleIncrementCb = () => {
    setTimeout(() => {
      setCounter((prev) => prev + 1);
    });
    setTimeout(() => {
      setCounter((prev) => prev + 1);
    });
    setTimeout(() => {
      setCounter((prev) => prev + 1);
    });
  };
  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={handleIncrementCb}>increment counter</button>
    </div>
  );
};
export default First;
