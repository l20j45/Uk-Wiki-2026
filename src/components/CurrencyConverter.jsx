// src/components/CurrencyConverter.jsx
import { useState } from 'react';

export default function CurrencyConverter() {
  const [mxn, setMxn] = useState('');
  const [rate, setRate] = useState(25); // Tasa fija del programa

  return (
    <div className="p-6 bg-slate-900 text-white rounded-3xl shadow-xl">
      <h3 className="text-lg font-bold mb-4 flex items-center">
        <span className="mr-2">💱</span> Conversor Rápido (Tasa Fija)
      </h3>
      <div className="space-y-4">
        <div>
          <label className="text-[10px] uppercase font-bold opacity-60">Pesos Mexicanos (MXN)</label>
          <input 
            type="number" 
            value={mxn}
            onChange={(e) => setMxn(e.target.value)}
            className="w-full bg-slate-800 border-none rounded-xl p-3 mt-1 focus:ring-2 focus:ring-indigo-500"
            placeholder="Ej: 500"
          />
        </div>
        <div className="flex items-center justify-center py-2">
          <span className="text-indigo-400 font-black">≈</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800 p-3 rounded-xl">
            <p className="text-[10px] uppercase opacity-60 font-bold">Libras (GBP)</p>
            <p className="text-xl font-mono">£{(mxn / 25).toFixed(2)}</p>
          </div>
          <div className="bg-slate-800 p-3 rounded-xl">
            <p className="text-[10px] uppercase opacity-60 font-bold">Euros (EUR)</p>
            <p className="text-xl font-mono">€{(mxn / 21).toFixed(2)}</p> 
          </div>
        </div>
      </div>
    </div>
  );
}