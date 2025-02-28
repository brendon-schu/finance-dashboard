import { useState, useEffect } from "react";

const DateTime = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // Updates every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <span className="text-gray-400 text-sm">
      {dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString()}
    </span>
  );
};

export default DateTime;

