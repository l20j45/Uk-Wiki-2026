import { useState } from "react";

export default function ContactFields({ initialEmergencyContacts = [] }) {
  const [emergencyContacts, setEmergencyContacts] = useState(
    initialEmergencyContacts.length > 0 ? initialEmergencyContacts : [{ name: "", number: "" }],
  );

  const addField = () => setEmergencyContacts([...emergencyContacts, { name: "", number: "" }]);

  const removeField = (index) => {
    const newEmergencyContacts = emergencyContacts.filter((_, i) => i !== index);
    setEmergencyContacts(
      newEmergencyContacts.length > 0 ? newEmergencyContacts : [{ name: "", number: "" }],
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">
          Contactos de Emergencia
        </h3>
        <button
          type="button"
          onClick={addField}
          className="text-[10px] bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-bold hover:bg-indigo-600 hover:text-white transition-all"
        >
          + Añadir Red
        </button>
      </div>

      {emergencyContacts.map((contact, index) => (
        <div
          key={index}
          className="flex gap-2 items-end animate-in fade-in slide-in-from-top-2"
        >
          <div className="flex-1 space-y-2">
            <input
              type="text"
              name="emergencyContactName[]"
              placeholder="Ej: Padre"
              defaultValue={contact.name}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none ring-1 ring-slate-100 dark:ring-slate-700 text-xs dark:text-white"
            />
            <input
              type="tel"
              name="emergencyContactNumber[]"
              placeholder="(+521) 55 1234 5678)"
              defaultValue={contact.number}
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

      <input type="hidden" name="emergencyContactsCount" value={emergencyContacts.length} />
    </div>
  );
}
