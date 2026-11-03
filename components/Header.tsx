"use client";

import { useEffect, useState } from "react";
import { MAX, NAV, PHONE, PHONE_HREF, TELEGRAM } from "./site";
import { CloseIcon, MaxIcon, MenuIcon, PhoneIcon, PinIcon, StarIcon, TelegramIcon } from "./icons";

function Rating() {
  return (
    <div className="rounded-2xl bg-black/45 px-4 py-2.5 text-gallery backdrop-blur-md">
      <div className="flex items-center gap-2">
        <PinIcon className="size-6 text-lavender" />
        <span className="text-[26px] leading-none">5.0</span>
        <span className="flex gap-0.5 text-tidal">
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} className="size-[18px]" />
          ))}
        </span>
      </div>
      <p className="mt-1 text-[11px] leading-tight">Рейтинг организации в Яндексе</p>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fade-in absolute inset-x-0 top-0 z-40 text-gallery" style={{ "--d": "0.1s" } as React.CSSProperties}>
      <div className="container-grid flex items-start justify-between gap-6 pt-5 md:pt-12">
        <a href="#" className="font-heading text-[20px] leading-none tracking-[0.04em] uppercase md:text-[30px]">
          LINA PM CODE
        </a>

        {/* desktop */}
        <div className="hidden items-start gap-6 xl:flex">
          <div className="flex flex-col items-end gap-2.5">
            <div className="flex items-center gap-4">
              <a href={PHONE_HREF} className="link-underline flex items-center gap-2 text-[20px]">
                <PhoneIcon className="size-6" />
                {PHONE}
              </a>
              <a href={TELEGRAM} aria-label="Telegram" className="icon-hover">
                <TelegramIcon className="size-6" />
              </a>
              <a href={MAX} aria-label="Max" className="icon-hover">
                <MaxIcon className="size-6" />
              </a>
            </div>
            <nav className="flex gap-7 text-[17px] uppercase">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} className="link-underline">
                  {n.label}
                </a>
              ))}
            </nav>
          </div>
          <Rating />
        </div>

        {/* mobile / tablet */}
        <div className="flex items-center gap-4 xl:hidden">
          <a href={MAX} aria-label="Max" className="icon-hover">
            <MaxIcon className="size-7" />
          </a>
          <a href={TELEGRAM} aria-label="Telegram" className="icon-hover">
            <TelegramIcon className="size-7" />
          </a>
          <button type="button" aria-label="Открыть меню" onClick={() => setOpen(true)} className="icon-hover">
            <MenuIcon className="size-9" strokeWidth={1.25} />
          </button>
        </div>
      </div>

      <div className="container-grid mt-3 flex justify-end xl:hidden">
        <Rating />
      </div>

      {/* burger overlay */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-mulberry px-[var(--gutter)] py-5 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between">
          <span className="font-heading text-[20px] tracking-[0.04em] uppercase">LINA PM CODE</span>
          <button type="button" aria-label="Закрыть меню" onClick={() => setOpen(false)}>
            <CloseIcon className="size-9" strokeWidth={1.25} />
          </button>
        </div>
        <nav className="font-heading mt-14 flex flex-col gap-6 text-[28px] uppercase">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="mt-auto flex items-center gap-4 pb-4">
          <a href={PHONE_HREF} className="flex items-center gap-2 text-[20px]">
            <PhoneIcon className="size-7" />
            {PHONE}
          </a>
          <a href={TELEGRAM} aria-label="Telegram">
            <TelegramIcon className="size-7" />
          </a>
          <a href={MAX} aria-label="Max">
            <MaxIcon className="size-7" />
          </a>
        </div>
      </div>
    </header>
  );
}
