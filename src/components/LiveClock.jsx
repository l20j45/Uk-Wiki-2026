import { useState, useEffect } from 'react';

export default function LiveClock({ timeZone, className = "" }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("es-MX", {
        timeZone: timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit", // Agregamos segundos para que se vea el movimiento
        hour12: false,
      });
      setTime(formatted);
    };

    updateClock(); // Carga inicial
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  return <span className={className}>{time}</span>;
}