import type { itineraryType } from "@shared/interfaces/dataDefinitions";
import { useEffect, useState } from "react";

interface Props {
  scheduleArray: itineraryType[];
}

export function TodayScheduleCard({ scheduleArray }: Props) {
  const now = new Date();

  const offset = now.getTimezoneOffset();
  const localDate = new Date(now.getTime() - offset * 60000)
    .toISOString()
    .split("T")[0];

  const localTime = now.toTimeString().slice(0, 5); // HH:MM

  const activityToday = scheduleArray.filter(
    (item) => item.eventDate === localDate,
  );

  const activity = activityToday.find((item) => {
    return (
      item.eventDate === localDate &&
      localTime >= item.eventTime &&
      localTime <= (item.finishTime ?? +item.eventTime + 5)
    );
  });

  let progress = 0;
  if (activity) {
    const start = new Date(`${activity.eventDate}T${activity.eventTime}`);
    const end = new Date(`${activity.eventDate}T${activity.finishTime}`);

    progress = Math.min(
      100,
      Math.max(
        0,
        ((now.getTime() - start.getTime()) /
          (end.getTime() - start.getTime())) *
          100,
      ),
    );
  }

  const upcomingEvents = scheduleArray
    .filter(
      (item) => item.eventDate === localDate && item.eventTime > localTime,
    )
    .sort((a, b) => a.eventTime.localeCompare(b.eventTime));
  

  const nextEvent = upcomingEvents[0];

  // Minutos para el próximo evento
  const [timeToNext, setTimeToNext] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    formatted: string;
  } | null>(null);

  function formatTimeDiff(ms: number) {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      hours,
      minutes,
      seconds,
      formatted: `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
    };
  }

  useEffect(() => {
    if (!nextEvent) {
      setTimeToNext(null);
      return;
    }

    const update = () => {
      const now = new Date();
      const nextStart = new Date(
        `${nextEvent.eventDate}T${nextEvent.eventTime}`,
      );

      const diffMs = nextStart.getTime() - now.getTime();

      if (diffMs <= 0) {
        setTimeToNext(null);
        return;
      }

      setTimeToNext(formatTimeDiff(diffMs));
    };

    update(); // calcular inmediatamente

    const interval = setInterval(update, 1000); // actualizar cada segundo

    return () => clearInterval(interval);
  }, [nextEvent]);
  return (
    <div className="bg-white border-2 border-indigo-100 rounded-3xl p-6 shadow-sm mb-8">
      <a
        id="schedule-link"
        href={`/itinerario?date=${localDate}`}
        className="block group"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Hoy: {localDate}
          </span>

          <div className="flex space-x-1 items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">
              En vivo
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-black text-slate-800 mb-1 leading-tight group-hover:text-indigo-600 transition-colors">
          {activity?.title ?? "Día Libre / Traslado"}
        </h2>

        <p className="text-indigo-600 font-medium flex items-center mb-4">
          <span className="mr-2">{activity?.icon ?? "🗺️"}</span>
          <span>
            {activity?.description ?? "Consultar itinerario detallado"}
          </span>
        </p>

        {/* Horario */}
        <div className="flex items-center text-slate-500 text-sm bg-slate-50 p-3 rounded-xl border border-dashed border-slate-200 mb-4">
          <span className="mr-2">⏰</span>
          <strong>Horario:</strong>
          <span className="ml-2">
            {activity
              ? `${activity.eventTime} - ${activity.finishTime}`
              : "N/A"}
          </span>
        </div>

        {/* Barra de progreso */}
        {activity && (
          <div className="w-full bg-slate-200 rounded-full h-3 mb-4 overflow-hidden">
            <div
              className="bg-indigo-600 h-3 transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {/* Próximo evento */}
        {activity && timeToNext && (
          <div className="text-sm text-slate-600 mt-2">
            Próximo evento en <strong>{timeToNext.formatted}</strong>:{" "}
            <span className="font-semibold">{nextEvent.title}</span>
          </div>
        )}

        {/* No hay más eventos */}
        {!activity && !nextEvent && (
          <div className="text-sm text-slate-500 mt-2">
            No hay más eventos programados para hoy.
          </div>
        )}
      </a>

      <a
        href="/itinerario"
        className="block text-center mt-6 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest"
      >
        Ver calendario completo →
      </a>
    </div>
  );
}
