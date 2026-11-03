"use client";

import { useState } from "react";
import { CloseIcon } from "./icons";

const ITEMS = ["1.11.26 – 30.11.26", "-25% OFF"];

export default function PromoBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  const set = Array.from({ length: 6 }, () => ITEMS).flat();

  return (
    <div
      className="relative z-50 overflow-hidden bg-lavender text-mulberry"
      style={{ height: "var(--promo-h)" }}
    >
      {/* два одинаковых набора — бесшовная прокрутка на -50% */}
      <div className="marquee-track h-full items-center" aria-hidden>
        {[0, 1].map((n) => (
          <div key={n} className="flex shrink-0 items-center">
            {set.map((t, i) => (
              <span
                key={i}
                className="px-[8vw] text-[13px] tracking-[0.2em] whitespace-nowrap md:px-[6vw]"
              >
                {t}
              </span>
            ))}
          </div>
        ))}
      </div>
      <span className="sr-only">Акция −25% с 1 по 30 ноября 2026</span>
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Закрыть"
        className="absolute inset-y-0 right-2 flex w-6 items-center justify-center bg-lavender text-mulberry"
      >
        <CloseIcon className="size-5" strokeWidth={2} />
      </button>
    </div>
  );
}
