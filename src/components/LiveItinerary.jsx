import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export default function LiveItinerary({ sheetUrl }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(sheetUrl);
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setEvents(results.data);
            setLoading(false);
          }
        });
      } catch (error) {
        console.error("Error cargando el itinerario:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, [sheetUrl]);

  if (loading) return (
    <div className="flex justify-center p-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200"></div>
      <div className="space-y-12">
        {events.map((item, index) => (
          <div key={index} className="relative pl-20 group animate-fade-in">
            <div className="absolute left-0 top-0 w-16 h-16 bg-white border-4 border-slate-100 rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:border-indigo-600 transition-all z-10">
              {item.icon || '📍'}
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-indigo-600">
                {item.date} — {item.type}
              </span>
              <h3 className="text-xl font-bold text-slate-800 mt-1">{item.title}</h3>
              <p className="text-slate-500 mt-2 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}