import { useState, useEffect } from 'react';

export default function DailySchedule({ scheduleArray = [] }) {
  const [today, setToday] = useState("");
  const [currentActivity, setCurrentActivity] = useState(null);

  useEffect(() => {
    // 1. Obtener fecha local (YYYY-MM-DD)
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localDate = new Date(now.getTime() - (offset * 60 * 1000))
      .toISOString()
      .split('T')[0];
    
    setToday(localDate);

    // 2. Buscar en el array de la BD
    // Nota: Para probar una fecha específica, cambia localDate por "2026-06-24"
    const activity = scheduleArray.find(item => item.eventDate === localDate);
    
    if (activity) {
      setCurrentActivity(activity);
    }
  }, [scheduleArray]);

  // Valores por defecto si no hay actividad hoy
  const displayActivity = currentActivity || {
    title: "Día Libre / Traslado",
    description: "Consultar itinerario detallado",
    eventTime: "N/A",
    icon: "🗺️"
  };

  return (
    
    <div className="bg-white border-2 border-indigo-100 rounded-3xl p-6 shadow-sm mb-8">
    
      <a href="/itinerario?date={today}" className="block text-center mt-6 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">
        Ver calendario completo →

      <div className="flex items-center justify-between mb-4">
        <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Hoy: {today}
        </span>
        <div className="flex space-x-1 items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] text-slate-400 font-bold uppercase">En vivo</span>
        </div>
      </div>

      <h2 className="text-2xl font-black text-slate-800 mb-1 leading-tight">
        {displayActivity.title}
      </h2>
      
      <p className="text-indigo-600 font-medium flex items-center mb-4">
        <span className="mr-2">{displayActivity.icon}</span> 
        {displayActivity.description}
      </p>

      <div className="flex items-center text-slate-500 text-sm bg-slate-50 p-3 rounded-xl border border-dashed border-slate-200">
        <span className="mr-2">⏰</span>
        <strong>Horario:</strong> 
        <span className="ml-2">{displayActivity.eventTime}</span>
      </div>
      </a>
      <a href="/itinerario" className="block text-center mt-6 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">
        Ver calendario completo →
      </a>
    </div>
  );
}