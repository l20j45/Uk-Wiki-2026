import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function UploadGallery() {
  const [loaded, setLoaded] = useState(false);
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    // 1. Verificar si el script ya existe
    if (document.getElementById("cloudinary-upload-widget-script")) {
      setLoaded(true);
      return;
    }

    // 2. Crear y cargar el script dinámicamente
    const script = document.createElement("script");
    script.id = "cloudinary-upload-widget-script";
    script.src = "https://upload-widget.cloudinary.com/global/all.js";
    script.async = true;
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (loaded && !widgetRef.current) {
      // @ts-ignore
      widgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName: "uk2026",
          uploadPreset: "galeriaUk2026",
          folder: "galeria",
          multiple: true,
          maxFiles: 10,
          clientAllowedFormats: ["png", "jpg", "jpeg", "mov", "mp4"],
          resourceType: "auto",
          
        },
        (error: any, result: any) => {
          if (!error && result.event === "success") {
            toast.success("¡Subida exitosa!");
            setTimeout(() => window.location.reload(), 2000);
          }
        },
      );
    }
  }, [loaded]);

  return (
    <button
      disabled={!loaded}
      onClick={() => widgetRef.current?.open()}
      className={`bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl transition-all ${!loaded ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700 active:scale-95"}`}
    >
      {loaded ? "Subir Fotos o Videos 📸" : "Cargando subidor..."}
    </button>
  );
}
