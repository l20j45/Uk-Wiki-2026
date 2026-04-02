import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';


interface Props {
  initialData?: {
    title?: string;
    content?: string;
    category?: string;
    description?: string;
    importance?: number;
    isUrgent?: number;
    image?: string;
  };
}

export default function WikiEditor({ initialData = {} }: Props) {
  const [value, setValue] = useState<string | undefined>(initialData.content || "");
  const [title, setTitle] = useState(initialData.title || "");
  const [category, setCategory] = useState(initialData.category || "General");
  const [importance, setImportance] = useState(initialData.importance || 1);
  const [isUrgent, setIsUrgent] = useState(initialData.isUrgent || 0);

  return (
    <div className="space-y-6 pb-20">
      {/* Fila 1: Título y Categoría */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-2 tracking-widest">Título de la Wiki</label>
          <input 
            type="text" 
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-4 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-bold"
          />
        </div>
        
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-2 tracking-widest">Categoría</label>
          <select 
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-4 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-bold appearance-none"
          >
            <option value="General">General</option>
            <option value="Logística">Logística</option>
            <option value="Académico">Académico</option>
            <option value="Emergencias">Emergencias</option>
          </select>
        </div>
      </div>

      {/* Fila 2: Descripción Corta e Imagen (URL) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-2 tracking-widest">Breve Descripción</label>
          <input 
            type="text" 
            name="description"
            defaultValue={initialData.description}
            placeholder="Resumen para la tarjeta..."
            className="w-full p-4 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-bold"
          />
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-2 tracking-widest">URL de Imagen (Cloudinary)</label>
          <input 
            type="text" 
            name="image"
            defaultValue={initialData.image}
            placeholder="https://res.cloudinary.com/..."
            className="w-full p-4 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-bold"
          />
        </div>
      </div>

      {/* Fila 3: Importancia y Urgencia */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="flex-1">
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-2 tracking-widest">Orden de Importancia</label>
            <input 
              type="range" 
              name="importance"
              min="1" max="10"
              value={importance}
              onChange={(e) => setImportance(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
          <span className="ml-6 text-xl font-black text-indigo-600">{importance}</span>
        </div>

        <div 
          onClick={() => setIsUrgent(isUrgent === 1 ? 0 : 1)}
          className={`p-6 rounded-[2rem] border transition-all cursor-pointer flex items-center justify-between shadow-sm ${isUrgent ? 'bg-rose-50 border-rose-100' : 'bg-white border-slate-100'}`}
        >
          <div>
            <p className={`text-[10px] font-black uppercase tracking-widest ${isUrgent ? 'text-rose-500' : 'text-slate-400'}`}>¿Es Información Urgente?</p>
            <p className="text-[9px] font-bold text-slate-400 uppercase">Aparecerá en rojo en el dashboard</p>
          </div>
          <div className={`w-12 h-6 rounded-full relative transition-colors ${isUrgent ? 'bg-rose-500' : 'bg-slate-200'}`}>
            <div className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-all ${isUrgent ? 'left-7' : 'left-1'}`}></div>
          </div>
          <input type="hidden" name="isUrgent" value={isUrgent} />
        </div>
      </div>

      {/* Editor de Markdown */}
      <div className="bg-white p-2 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden" data-color-mode="light">
        <MDEditor
          value={value}
          onChange={setValue}
          height={500}
          preview="live"
          className="!border-none !shadow-none"
        />
        <input type="hidden" name="content" value={value} />
      </div>

      <button 
        type="submit"
        className="w-full bg-indigo-600 text-white font-black py-6 rounded-[2rem] shadow-xl shadow-indigo-100 hover:scale-[1.01] active:scale-[0.99] transition-all uppercase tracking-widest text-xs"
      >
        Guardar Artículo en la Wiki
      </button>
    </div>
  );
}