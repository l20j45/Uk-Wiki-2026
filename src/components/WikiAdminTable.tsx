import React, { useState } from "react";

interface User {
  id: number;
  fullName: string;
  username: string | null;
  role: string;
  qrUrl: string;
  image: string | null;
}

interface Props {
  initialUsers: User[];
}

export default function EventAdminTable({ initialUsers = [] }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = initialUsers.filter(
    (event) =>
      event.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.username?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = async (id: number, username: string) => {
    const confirmDelete = window.confirm(
      `¿Estás seguro de eliminar a @${username}? Esta acción es irreversible.`,
    );

    if (confirmDelete) {
      try {
        const response = await fetch(`/api/users/${id}`, {
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
          <h3 className="text-sm font-black uppercase text-slate-900 tracking-widest">
            Lista de Usuarios
          </h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">
            Gestión de accesos y QR
          </p>
        </div>

        <div className="relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
            🔍
          </span>
          <input
            type="text"
            placeholder="Buscar por nombre, usuario, rol o QR..."
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
              <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-tighter">
                Usuario
              </th>
              <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-tighter">
                Rol
              </th>
              <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-tighter">
                QR
              </th>
              <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-tighter text-right">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <tr
                  key={event.id}
                  className="hover:bg-slate-50/30 transition-colors group"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm group-hover:scale-110 transition-transform">
                        {event.image ? (
                          <img
                            src={event.image}
                            alt={event.fullName}
                            className="w-full h-full object-cover rounded-2xl"
                          />
                        ) : (
                          <span className="text-xl flex items-center justify-center h-full">
                            👤
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          {event.fullName}
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium line-clamp-1 max-w-[200px]">
                          {event.username || "Sin usuario"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-6">
                    <span className="text-xs font-black text-indigo-600">
                      {event.role}
                    </span>
                  </td>

                  <td className="p-6">
                    <div
                      className={`w-30 h-30 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tight ${
                        event.qrUrl === "validado"
                          ? "bg-green-100 text-green-600"
                          : event.qrUrl === "pendiente"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {event.qrUrl != "pendiente" ? (
                        <a
                          href={event.qrUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          <img
                            src={event.qrUrl}
                            alt="QR"
                            className="object-cover w-full h-full rounded-lg"
                          />
                        </a>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          Pendiente
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a
                        href={`/admin/usuarios/editar/${event.id}`}
                        className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all"
                      >
                        ✏️
                      </a>
                      <button
                        onClick={() => handleDelete(event.id, event.username)}
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
                <td
                  colSpan={4}
                  className="p-20 text-center text-slate-400 italic text-sm"
                >
                  No se encontraron resultados para "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
