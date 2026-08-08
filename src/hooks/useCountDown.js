import React, { useEffect, useState } from "react";

function useCountDown(duration) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  const convertedTimeFormat = () => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0")}`;
  };

  const restart = () => {
    setTimeLeft(duration);
    setIsRunning(true);
  };

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) {
      if (timeLeft <= 0) {
        setIsRunning(false);
        return;
      }
    }

    if (timeLeft <= 0) {
      setIsRunning(false);
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isRunning]);
  return {
    timeLeft,
    isRunning,
    isExpired: timeLeft == 0,
    convertedTimeFormat,
    restart,
  };
}

export default useCountDown;
