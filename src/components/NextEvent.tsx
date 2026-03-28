import { useState, useEffect } from 'react';

export const NextEvent = () => {
  const [timeLeft, setTimeLeft] = useState("02:45:10");

  // Simulación de cuenta regresiva dummy
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-6 rounded-2xl shadow-xl my-8">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs uppercase tracking-widest opacity-80">Próxima Actividad</p>
          <h2 className="text-2xl font-bold">Tour en British Museum</h2>
          <p className="flex items-center mt-2 text-sm">
            📍 Punto de encuentro: Gran Atrio (Great Court)
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-mono font-bold">{timeLeft}</p>
          <p className="text-[10px] uppercase">Tiempo restante</p>
        </div>
      </div>
    </div>
  );
};