import { useState, useEffect } from 'react';

const scheduleData = {
  "2026-06-29": { activity: "Llegada y Check-in", location: "Campus De Havilland", time: "Todo el día" },
  "2026-06-30": { activity: "Bienvenida y Módulo 1: Fundamentos IA", location: "Aula Magna UH", time: "09:00 - 13:00" },
  "2026-07-01": { activity: "Módulo 2: Planificación MS Project", location: "Lab de Cómputo", time: "09:00 - 13:00" },
  "2026-07-03": { activity: "Visita Especial: King's College Hospital", location: "Londres (Punto de reunión: Recepción)", time: "08:30 SHARP" },
  "2026-07-06": { activity: "Visita Académica: Bletchley Park", location: "Milton Keynes", time: "09:00 - 17:00" },
  // Agrega aquí el resto de los días del calendario...
};

export default function DailySchedule() {
  const [today, setToday] = useState("");

  useEffect(() => {
    // Obtenemos la fecha actual en formato YYYY-MM-DD
    // const now = new Date();
    // const offset = now.getTimezoneOffset();
    // const localDate = new Date(now.getTime() - (offset * 60 * 1000)).toISOString().split('T')[0];
    // setToday(localDate);
    setToday("2026-07-03");
  }, []);

  const currentActivity = scheduleData[today] || { 
    activity: "Día Libre / Traslado", 
    location: "Consultar itinerario detallado", 
    time: "N/A" 
  };

  return (
    <div className="bg-white border-2 border-indigo-100 rounded-3xl p-6 shadow-sm mb-8">
      <div className="flex items-center justify-between mb-4">
        <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Hoy: {today}
        </span>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] text-slate-400 font-bold uppercase">En vivo</span>
        </div>
      </div>

      <h2 className="text-2xl font-black text-slate-800 mb-1">{currentActivity.activity}</h2>
      <p className="text-indigo-600 font-medium flex items-center mb-4">
        <span className="mr-2">📍</span> {currentActivity.location}
      </p>

      <div className="flex items-center text-slate-500 text-sm bg-slate-50 p-3 rounded-xl border border-dashed border-slate-200">
        <span className="mr-2">⏰</span>
        <strong>Horario:</strong> <span className="ml-2">{currentActivity.time}</span>
      </div>

      <a href="/wiki/itinerario-completo" class="block text-center mt-6 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">
        Ver calendario completo →
      </a>
    </div>
  );
}