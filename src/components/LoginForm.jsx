import { useState } from "react";
import {Toaster, toast } from "sonner";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Acceso concedido", {
          description: "Redirigiendo...",
          duration: 2000,
        });

        setTimeout(() => {
          window.location.href = data.isAdmin ? "/admin" : "/";
        }, 1000);
      } else {
        toast.error("Error de acceso", {
          description: data.message,
        });
      }
    } catch (err) {
      toast.error("Error de conexión", {
        description: "Inténtalo más tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     <Toaster richColors position="top-center" />

    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100"
    >
      <h1 className="text-3xl font-black mb-6 text-slate-900">
        User <span className="text-indigo-600">UK</span>
      </h1>

      <div className="space-y-4">
        <input
          name="username"
          type="text"
          placeholder="Usuario"
          required
          className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 ring-indigo-500 outline-none"
        />

        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          required
          className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 ring-indigo-500 outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-100 disabled:opacity-50"
        >
          {loading ? "Entrando..." : "Entrar al Panel"}
        </button>
      </div>
    </form>
    </>
  );
}