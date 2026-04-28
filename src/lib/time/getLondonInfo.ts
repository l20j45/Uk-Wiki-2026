export function getLondonInfo() {
  const now = new Date();

  const timeOptions = (tz: string): Intl.DateTimeFormatOptions => ({
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const londonTime = now.toLocaleTimeString("es-MX", timeOptions("Europe/London"));
  
  const hourLondon = parseInt(londonTime.split(":")[0]);

  const greeting =
    hourLondon < 12
      ? "Good morning"
      : hourLondon < 18
      ? "Good afternoon"
      : "Good evening";

  const londonHour = new Date(
    now.toLocaleString("en-US", { timeZone: "Europe/London" })
  ).getHours();
  console.log("🚀 ~ getLondonInfo ~ londonHour:", londonHour)

  // Estilos dinámicos
  let headerClass = "from-white to-slate-50 ";
  let accentColor = "text-indigo-600";
  let clockGradient = "from-indigo-600 to-blue-700";

if (londonHour >= 0 && londonHour < 6) {
  // 🌑 Madrugada fría
  headerClass = "from-slate-950 via-slate-900 to-slate-800 text-white";
  accentColor = "text-blue-300";
  clockGradient = "from-indigo-900 to-blue-700";

} else if (londonHour >= 6 && londonHour < 10) {
  // 🌅 Amanecer cálido
  headerClass = "from-rose-100 via-orange-100 to-yellow-100";
  accentColor = "text-rose-600";
  clockGradient = "from-rose-400 to-orange-500";

} else if (londonHour >= 10 && londonHour < 14) {
  // 🌤 Mañana brillante
  headerClass = "from-sky-100 via-blue-50 to-white";
  accentColor = "text-sky-600";
  clockGradient = "from-sky-400 to-blue-500";

} else if (londonHour >= 14 && londonHour < 18) {
  // 🌞 Mediodía cálido
  headerClass = "from-yellow-50 via-amber-100 to-orange-50";
  accentColor = "text-amber-600";
  clockGradient = "from-yellow-400 to-amber-500";

} else if (londonHour >= 18 && londonHour < 20) {
  // 🌇 Atardecer (tu bloque original)
  headerClass = "from-orange-50 via-rose-50 to-slate-50";
  accentColor = "text-orange-600";
  clockGradient = "from-orange-500 to-rose-600";

} else if (londonHour >= 20 && londonHour < 23) {
  // 🌃 Noche azulada
  headerClass = "from-indigo-900 via-slate-900 to-black text-white";
  accentColor = "text-indigo-400";
  clockGradient = "from-indigo-700 to-slate-800";

} else {
  // 🌑 Noche profunda (tu bloque original)
  headerClass = "from-slate-900 via-indigo-950 to-slate-950 text-white";
  accentColor = "text-indigo-400";
  clockGradient = "from-rose-500 to-indigo-700";
}


  return {
    greeting,
    londonHour,
    headerClass,
    accentColor,
    clockGradient,
  };
}
