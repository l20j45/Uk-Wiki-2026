import React, { useState } from 'react';
import { toast, Toaster } from 'sonner';

export default function ChangePasswordModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/users/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        // Si hay errores de validación (Zod) o lógica (contraseña incorrecta)
        const message = result.message || 'Error al actualizar la contraseña';
        throw new Error(message);
      }

      // Éxito
      toast.success('¡Contraseña actualizada correctamente!');
      setIsOpen(false);
      (e.target as HTMLFormElement).reset();
      
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toaster configurado para Astro/React */}
      <Toaster richColors position="top" />

      <button 
        onClick={() => setIsOpen(true)}
        className="bg-slate-900 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-indigo-600 transition-all active:scale-95"
      >
        Cambiar Contraseña
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div 
            className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in fade-in zoom-in duration-200 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-black text-slate-900 mb-6">Actualizar Seguridad</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 ml-2">Contraseña Actual</label>
                <input 
                  required 
                  name="currentPassword" 
                  type="password" 
                  className="w-full p-4 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 ml-2">Nueva Contraseña</label>
                <input 
                  required 
                  name="newPassword" 
                  type="password" 
                  className="w-full p-4 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 ml-2">Confirmar Nueva Contraseña</label>
                <input 
                  required 
                  name="confirmPassword" 
                  type="password" 
                  className="w-full p-4 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
                />
              </div>

              {error && (
                <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl">
                   <p className="text-rose-500 text-xs font-bold animate-pulse">
                    ⚠️ {error}
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-4 font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-[2] bg-indigo-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-200 disabled:opacity-50 transition-all hover:bg-indigo-700 active:scale-95"
                >
                  {loading ? 'Procesando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          </div>
          
          {/* Capa para cerrar al hacer click fuera */}
          <div className="absolute inset-0 -z-10" onClick={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
}