import React, { useState } from 'react';

interface Event {
  id: number;
  title: string;
  description: string | null;
  eventDate: string | null;
  eventTime: string | null;
  location: string | null;
  icon: string | null;
}

interface Props {
  initialEvents: Event[];
}

export default function EventAdminTable({ initialEvents=[] }: Props) {
  
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = initialEvents.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.eventDate.includes(searchTerm)
  );

    const handleDelete = async (id: number, username: string) => {
    const confirmDelete = window.confirm(
      `¿Estás seguro de eliminar a ${username}? Esta acción es irreversible.`,
    );

    if (confirmDelete) {
      try {
        const response = await fetch(`/api/itinerario/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          
          window.location.reload();
        } else {
          alert("Error al eliminar el usuario.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden mt-8">
      <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-black uppercase text-slate-900 tracking-widest">Cronograma de Viaje</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Gestión de paradas y logística</p>
        </div>

        <div className="relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
            🔍
          </span>
          <input 
            type="text" 
            placeholder="Buscar por título, lugar o fecha..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-11 pr-6 py-3 bg-slate-50 border-none ring-1 ring-slate-100 rounded-2xl text-xs font-bold focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-72 transition-all"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-tighter">Actividad</th>
              <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-tighter">Horario</th>
              <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-tighter">Ubicación</th>
              <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-tighter text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <tr key={event.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">
                        {event.icon || "📍"}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{event.title}</p>
                        <p className="text-[10px] text-slate-400 font-medium line-clamp-1 max-w-[200px]">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-indigo-600">{event.eventDate}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        {event.eventTime} hrs
                      </span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="px-3 py-1 bg-slate-100 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-tight">
                      {event.location || "Londres"}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a 
                        href={`/admin/itinerario/editar/${event.id}`} 
                        className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all"
                      >
                        ✏️
                      </a>
                      <button 
                        className="p-2 hover:bg-rose-50 rounded-lg text-rose-500 transition-all"
                                                onClick={() => handleDelete(event.id, event.title)}
                        className="p-2 hover:bg-rose-50 rounded-lg text-rose-500 transition-all"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-20 text-center text-slate-400 italic text-sm">
                  No se encontraron eventos que coincidan con "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}