import { useEffect, useRef } from "react";
import Masonry from "react-masonry-css";
import "photoswipe/style.css";

export default function Gallery({ resources }) {
  console.log("🚀 ~ Gallery ~ resources:", resources)
  const lightboxRef = useRef(null);

  useEffect(() => {
    async function initLightbox() {
      const PhotoSwipeLightbox = (await import("photoswipe/lightbox")).default;

      console.log("Inicializando PhotoSwipe…");

      const lightbox = new PhotoSwipeLightbox({
        gallery: "#gallery-react",
        children: "a",
        pswpModule: () => import("photoswipe"),
      });

      lightbox.on("uiRegister", () => {
        lightbox.pswp.ui.registerElement({
          name: "delete-button",
          order: 9,
          isButton: true,
          html: "🗑️",
          onClick: async () => {
            const pswp = lightbox.pswp;
            const current = pswp.currSlide.data;

            console.log("Slide actual:", current);

            // Si esto pasa, PhotoSwipe no vinculó el slide con el <a>
            if (!current.src) {
              alert("No se pudo identificar el elemento en la galería.");
              return;
            }

            const publicId = current.src.match(/\/upload\/.*\/([^/]+)\.\w+$/)?.[1];

            if (!confirm("¿Eliminar esta imagen?")) return;

            await fetch("/api/delete-image", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ publicId }),
            });

            pswp.close();
            current.el.remove();
          },
        });
      });

      lightbox.init();
      lightboxRef.current = lightbox;
    }

    initLightbox();

    return () => {
      if (lightboxRef.current) {
        lightboxRef.current.destroy();
      }
    };
  }, []);

  const breakpointColumns = {
    default: 4,
    1024: 3,
    640: 2,
    0: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex gap-4 p-4"
      columnClassName="flex flex-col gap-4"
      id="gallery-react"
    >
      {resources.map((item) => {
        const thumb = item.secure_url.replace(
          "/upload/",
          "/upload/f_auto,q_auto,w_600/"
        );
        const full = item.secure_url.replace(
          "/upload/",
          "/upload/f_auto,q_auto/"
        );

        // Fallbacks seguros
        const width = item.width || 1600;
        const height = item.height || 900;

        return (
          <a
            key={item}
            href={full}
            data-pswp-width={width}
            data-pswp-height={height}
            data-public-id={item.public_id}
            alt={item}
            className="rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all"
          >
            <img src={thumb} className="w-full h-auto" loading="lazy" />
          </a>
        );
      })}
    </Masonry>
  );
}
