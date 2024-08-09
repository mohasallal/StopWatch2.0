import { useState, useEffect, useRef } from "react";

function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  function Start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }
  function Stop() {
    setIsRunning(false);
  }
  function Reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }
  function FormatTime() {
    let min = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let sec = Math.floor((elapsedTime / 1000) % 60);
    let milsec = Math.floor((elapsedTime % 1000) / 10);

    return `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}:${milsec.toString().padStart(2, "0")}`;
  }

  return (
    <div className="stopwatch">
      <div className="display">{FormatTime()}</div>
      <div className="controls">
        <button onClick={Start} className="Start">
          Start
        </button>
        <button onClick={Reset} className="Reset">
          Reset
        </button>
        <button onClick={Stop} className="Stop">
          Stop
        </button>
      </div>
    </div>
  );
}

export default StopWatch;
