import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { socialIcons } from "@components/socialIcons";

import type { usersTypewithoutSensibleData } from "@app/src/shared/interfaces/dataDefinitions";
import Avatar from "../perfil/Avatar";

interface props {
  participants: usersTypewithoutSensibleData[];
}

export default function ParticipantsDirectory({ participants }: props) {
  const [selected, setSelected] = useState<usersTypewithoutSensibleData | null>(
    null,
  );

  // Cerrar con ESC
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") {
        setSelected(null);
      }
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
        {participants.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p)}
            className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all text-left"
          >
            <div className="flex flex-col items-center text-center">
              <Avatar
                url={p.avatarUrl || "/default-avatar.png"}
                sizeTransformation="/upload/w_200,h_200,c_thumb,g_face/"
              />

              <h3 className="font-bold text-slate-800 text-lg">{p.fullName}</h3>
              <p className="text-xs text-slate-500 mt-1">{p.role}</p>
              <p className="text-xl mt-2">{p.username}</p>
            </div>
          </button>
        ))}
      </div>

      {/* MODAL ANIMADO */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-11/12 max-w-md rounded-3xl p-6 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <button
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 text-xl"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>

              <div className="flex flex-col items-center text-center">
                <Avatar
                  url={selected.avatarUrl || "/default-avatar.png"}
                  sizeTransformation="/upload/w_100,h_100,c_thumb,g_face/"
                />

                <h2 className="text-2xl font-black text-slate-800">
                  {selected.fullName}
                </h2>
                <p className="text-sm text-slate-500 mt-1">{selected.role}</p>
                <p className="text-2xl mt-2">{selected.bio}</p>

                {selected.socials && selected.socials.length > 0 && (
                  <div className="flex space-x-4 mt-4">
                    {selected.socials.map((social, index) => {
                      const key = social.platform.toLowerCase().trim() as keyof typeof socialIcons;
                      const icon = socialIcons[key] || socialIcons["website"];
                      return (
                        
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-600 hover:text-indigo-600 transition"
                        >
                          {icon}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
