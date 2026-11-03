"use client";

import { useEffect, useState } from "react";
import { PROMO_DEADLINE } from "./site";

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [
    ["дн", Math.floor(s / 86400)],
    ["час", Math.floor((s % 86400) / 3600)],
    ["мин", Math.floor((s % 3600) / 60)],
    ["сек", s % 60],
  ] as const;
}

/** Обратный отсчёт до реального окончания акции. После окончания не показывается. */
export default function PromoTimer({ className = "" }: { className?: string }) {
  // null до монтирования — чтобы серверная и клиентская разметка совпали
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const end = new Date(PROMO_DEADLINE).getTime();
    const tick = () => setLeft(end - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (left !== null && left <= 0) return null;

  return (
    <div className={`flex items-center gap-2 ${className}`} role="timer" aria-label="До конца акции">
      {parts(left ?? 0).map(([label, value], i) => (
        <div key={label} className="flex items-center gap-2">
          <div className="flex min-w-[52px] flex-col items-center rounded bg-mulberry px-2 py-2 text-gallery">
            <span className="font-heading text-[22px] leading-none tabular-nums">
              {left === null ? "––" : String(value).padStart(2, "0")}
            </span>
            <span className="mt-1 text-[10px] tracking-[0.08em] text-gallery/60 uppercase">{label}</span>
          </div>
          {i < 3 && (
            <span aria-hidden className="text-mulberry/50">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
