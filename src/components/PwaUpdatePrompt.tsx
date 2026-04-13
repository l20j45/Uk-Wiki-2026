import { useRegisterSW } from "virtual:pwa-register/react";

export default function PwaUpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!needRefresh) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        background: "#4f46e5",
        color: "white",
        padding: "1rem 1.25rem",
        borderRadius: "0.75rem",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        zIndex: 9999,
        maxWidth: "280px",
      }}
    >
      <p style={{ margin: 0, fontWeight: 600 }}>
        🚀 Nueva versión disponible
      </p>
      <p style={{ margin: 0, fontSize: "0.875rem", opacity: 0.85 }}>
        Actualiza para ver los últimos cambios.
      </p>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={() => updateServiceWorker(true)}
          style={{
            flex: 1,
            background: "white",
            color: "#4f46e5",
            border: "none",
            borderRadius: "0.5rem",
            padding: "0.5rem",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Actualizar
        </button>
        <button
          onClick={() => setNeedRefresh(false)}
          style={{
            flex: 1,
            background: "transparent",
            color: "white",
            border: "1px solid rgba(255,255,255,0.4)",
            borderRadius: "0.5rem",
            padding: "0.5rem",
            cursor: "pointer",
          }}
        >
          Ahora no
        </button>
      </div>
    </div>
  );
}