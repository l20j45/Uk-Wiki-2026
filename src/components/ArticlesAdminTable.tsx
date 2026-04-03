import React, { useState } from "react";

interface article {
  id: number ;
  title: any ;
  description: any ;
  category: any ;
  isUrgent: any ;
}
interface Props {
  initialArticles: article[];
}

export default function ArticlesAdminTable({ initialArticles = [] }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArticles = initialArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = async (id: number, title: string) => {
    const confirmDelete = window.confirm(
      `¿Estás seguro de eliminar a ${title}? Esta acción es irreversible.`,
    );

    if (confirmDelete) {
      try {
        const response = await fetch(`/api/articles/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          window.location.reload();
        } else {
          alert("Error al eliminar el articulo.");
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
            Lista de Articulos
          </h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">
            Gestión de articulos
          </p>
        </div>

        <div className="relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
            🔍
          </span>
          <input
            type="text"
            placeholder="Buscar por titulo, descripcion o categoria..."
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
                titulo
              </th>
              <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-tighter">
                descripcion
              </th>
              <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-tighter">
                categoria
              </th>
              <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-tighter">
                urgencia
              </th>
              <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-tighter text-right">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <tr
                  key={article.id}
                  className="hover:bg-slate-50/30 transition-colors group"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className=" bg-white overflow-hidden  group-hover:scale-110 transition-transform">
                        <span>{article.title}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {article.description || "Sin descripcion"}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div
                      className={`w-20 h-10 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tight ${
                        article.category === "logistica"
                          ? "bg-blue-100 text-teal-900"
                          : article.category === "academico"
                            ? "bg-green-100 text-green-600"
                            : article.category === "emergencias"
                              ? "bg-red-100 text-yellow-600"
                              : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <div className="flex items-center justify-center h-full">
                        {article.category}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div
                        className={`w-20 h-10 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tight ${
                          article.isUrgent == true
                            ? "bg-red-100 text-yellow-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <div className="flex items-center justify-center h-full">
                          {article.isUrgent == true ? "urgente" : "normal"}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a
                        href={`/admin/articulos/editar/${article.id}`}
                        className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all"
                      >
                        ✏️
                      </a>
                      <button
                        onClick={() => handleDelete(article.id, article.title)}
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
