// src/components/PanicButton.jsx
export default function PanicButton() {
  return (
    <a 
      href="/sos" 
      className="relative inline-flex items-center px-4 py-2 font-bold text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.5)]"
    >
      <span className="mr-2">🚨</span>
      S.O.S.
    </a>
  );
}