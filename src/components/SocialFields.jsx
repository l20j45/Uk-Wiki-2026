import { useState } from "react";

export default function SocialFields({ initialSocials = [] }) {
  const [socials, setSocials] = useState(
    initialSocials.length > 0 ? initialSocials : [{ platform: "", url: "" }],
  );

  const addField = () => setSocials([...socials, { platform: "", url: "" }]);

  const removeField = (index) => {
    const newSocials = socials.filter((_, i) => i !== index);
    setSocials(
      newSocials.length > 0 ? newSocials : [{ platform: "", url: "" }],
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">
          Redes Sociales
        </h3>
        <button
          type="button"
          onClick={addField}
          className="text-[10px] bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-bold hover:bg-indigo-600 hover:text-white transition-all"
        >
          + Añadir Red
        </button>
      </div>

      {socials.map((social, index) => (
        <div
          key={index}
          className="flex gap-2 items-end animate-in fade-in slide-in-from-top-2"
        >
          <div className="flex-1 space-y-2">
            <input
              type="text"
              name="socialPlatform[]"
              placeholder="Ej: Instagram"
              defaultValue={social.platform}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none ring-1 ring-slate-100 dark:ring-slate-700 text-xs dark:text-white"
            />
            <input
              type="url"
              name="socialUrl[]"
              placeholder="https://..."
              defaultValue={social.url}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none ring-1 ring-slate-100 dark:ring-slate-700 text-xs dark:text-white"
            />
          </div>
          <button
            type="button"
            onClick={() => removeField(index)}
            className="p-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
          >
            ✕
          </button>
        </div>
      ))}

      <input type="hidden" name="socialsCount" value={socials.length} />
    </div>
  );
}
