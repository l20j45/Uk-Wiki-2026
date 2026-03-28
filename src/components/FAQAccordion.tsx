import { useState } from 'react';

const faqData = [
  {
    q: "¿El vuelo está incluido en el costo de 1,950 libras?",
    a: "No. El costo cubre el curso, alojamiento, visitas empresariales y traslados grupales. Cada alumno debe comprar su boleto de avión para tener flexibilidad de fechas y aerolíneas."
  },
  {
    q: "¿Necesito tramitar una Visa para Inglaterra o Francia?",
    a: "Si eres mexicano, no necesitas visa de turista para estancias cortas en el Reino Unido ni en el espacio Schengen (Francia). Solo necesitas tu pasaporte vigente."
  },
  {
    q: "¿Cómo se realizan los pagos si el costo es en libras?",
    a: "Para facilitar el proceso, se fijó una tasa de $25.00 MXN por libra. Los pagos se realizan en pesos mexicanos a la cuenta oficial del programa en las fechas establecidas (Marzo, Abril, Mayo y Junio)."
  },
  {
    q: "¿Qué pasa con las comidas?",
    a: "Las comidas no están incluidas. El Campus De Havilland tiene áreas de cocina y supermercados cercanos (Tesco/ASDA) para que puedas preparar tus alimentos, además de cafeterías universitarias."
  },
  {
    q: "¿Es obligatorio el seguro médico?",
    a: "Sí, es un requisito indispensable para participar. Debe tener cobertura internacional amplia tanto para el Reino Unido como para Francia (si haces la extensión)."
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {faqData.map((item, i) => (
        <div key={i} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
          <button 
            className="w-full text-left p-4 font-bold flex justify-between items-center hover:bg-slate-50 transition-colors"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            {item.q}
            <span>{openIndex === i ? '−' : '+'}</span>
          </button>
          {openIndex === i && (
            <div className="p-4 pt-0 text-slate-600 text-sm animate-fade-in">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}