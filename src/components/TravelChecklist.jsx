import { useState } from 'react';

const items = [
  { id: 1, task: "Pasaporte vigente (mínimo 6 meses)", cat: "Obligatorio" },
  { id: 2, task: "Seguro Médico Internacional (Copia impresa)", cat: "Obligatorio" },
  { id: 3, task: "Carta de Aceptación de UH", cat: "Obligatorio" },
  { id: 4, task: "Foto tamaño carnet (para el Pase Navigo)", cat: "París" },
  { id: 5, task: "Adaptador de corriente Reino Unido (Tipo G)", cat: "Maleta" },
  { id: 6, task: "Libras esterlinas en efectivo (£200 recomendadas)", cat: "Dinero" },
  { id: 7, task: "App Citymapper instalada", cat: "Digital" },
  { id: 8, task: "Ropa en capas (impermeable incluido)", cat: "Maleta" },
];

export default function TravelChecklist() {
  const [checked, setChecked] = useState([]);

  const toggle = (id) => {
    setChecked(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const progress = Math.round((checked.length / items.length) * 100);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 max-w-xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-end mb-2">
          <h3 className="font-black text-xl text-slate-800">Maleta Lista</h3>
          <span className="text-indigo-600 font-bold">{progress}%</span>
        </div>
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-600 h-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <label 
            key={item.id} 
            className={`flex items-center p-3 rounded-xl cursor-pointer transition-colors ${checked.includes(item.id) ? 'bg-indigo-50' : 'hover:bg-slate-50'}`}
          >
            <input 
              type="checkbox" 
              className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              onChange={() => toggle(item.id)}
            />
            <div className="ml-3">
              <p className={`text-sm font-medium ${checked.includes(item.id) ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                {item.task}
              </p>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{item.cat}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}