"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { CERTIFICATES } from "./certificates-data";
import { CloseIcon } from "./icons";

const arrowBtn =
  "flex size-11 items-center justify-center rounded-full border border-mulberry/30 text-[20px] md:size-12 text-mulberry transition-colors hover:border-mulberry hover:bg-mulberry hover:text-gallery disabled:pointer-events-none disabled:opacity-30";

function Zoom({ index, onClose, onNav }: { index: number; onClose: () => void; onNav: (d: 1 | -1) => void }) {
  const c = CERTIFICATES[index];
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, easing: "ease-out" });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onNav]);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={c.title}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 md:p-10"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Закрыть"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-gallery md:top-8 md:right-8"
      >
        <CloseIcon className="size-9" strokeWidth={1.25} />
      </button>
      {(["←", "→"] as const).map((a, i) => (
        <button
          key={a}
          type="button"
          aria-label={i ? "Следующий сертификат" : "Предыдущий сертификат"}
          onClick={(e) => {
            e.stopPropagation();
            onNav(i ? 1 : -1);
          }}
          className={`absolute top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-gallery/10 text-[22px] text-gallery transition-colors hover:bg-lavender hover:text-mulberry md:flex ${
            i ? "right-8" : "left-8"
          }`}
        >
          {a}
        </button>
      ))}
      <div className="flex max-h-full flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
        <Image
          key={c.file}
          src={c.file}
          alt={c.title}
          width={c.width}
          height={c.height}
          sizes="100vw"
          className="max-h-[calc(100svh-140px)] w-auto max-w-full rounded bg-white object-contain"
        />
        <p className="text-center text-[15px] text-gallery/80">
          {c.title} · {c.issuer}
          {c.date ? ` · ${c.date}` : ""}
        </p>
      </div>
    </div>
  );
}

export default function Certificates() {
  const scroller = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);
  const [edge, setEdge] = useState<"start" | "end" | null>("start");
  const [open, setOpen] = useState<number | null>(null);

  const update = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 0 ? el.scrollLeft / max : 0;
    setProgress(p);
    setEdge(p <= 0.002 ? "start" : p >= 0.998 ? "end" : null);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  // Перетаскивание мышью. Касания обрабатывает браузер (нативный свайп).
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ x: 0, left: 0, moved: false });

  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    const el = scroller.current;
    if (!el || e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = { x: e.clientX, left: el.scrollLeft, moved: false };

    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - drag.current.x;
      if (!drag.current.moved && Math.abs(dx) < 5) return;
      drag.current.moved = true;
      setDragging(true);
      el.scrollLeft = drag.current.left - dx;
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      setDragging(false);
      // клик, завершающий перетаскивание, не должен открывать сертификат
      if (drag.current.moved) setTimeout(() => (drag.current.moved = false), 0);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };

  const close = useCallback(() => setOpen(null), []);
  const nav = useCallback(
    (d: 1 | -1) =>
      setOpen((i) => (i === null ? i : (i + d + CERTIFICATES.length) % CERTIFICATES.length)),
    [],
  );

  return (
    <div>
      <div className="container-grid flex items-end justify-between gap-4 md:gap-6">
        <h3 className="font-heading min-w-0 text-[22px] leading-[1.15] uppercase md:text-[40px]">
          Мои сертификаты
        </h3>
        <div className="flex flex-none gap-2 md:gap-3">
          <button type="button" aria-label="Назад" onClick={() => scrollBy(-1)} disabled={edge === "start"} className={arrowBtn}>
            ←
          </button>
          <button type="button" aria-label="Вперёд" onClick={() => scrollBy(1)} disabled={edge === "end"} className={arrowBtn}>
            →
          </button>
        </div>
      </div>

      <ul
        ref={scroller}
        onScroll={update}
        onPointerDown={onPointerDown}
        onClickCapture={(e) => {
          if (drag.current.moved) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        className={`no-scrollbar mt-8 flex select-none gap-6 overflow-x-auto ${
          dragging ? "cursor-grabbing" : "cursor-grab snap-x snap-mandatory"
        } px-(--gutter) [--ch:300px] [scroll-padding-inline:var(--gutter)] md:mt-12 md:gap-10 md:[--ch:420px]`}
      >
        {CERTIFICATES.map((c, i) => (
          <li key={c.file} className="flex-none snap-start">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group block cursor-[inherit] text-left"
              aria-label={`${c.title}. Открыть сертификат`}
            >
              <div className="overflow-hidden rounded border border-mulberry/10 bg-white">
                <Image
                  src={c.file}
                  alt={c.title}
                  width={c.width}
                  height={c.height}
                  draggable={false}
                  sizes={`${Math.round((420 * c.width) / c.height)}px`}
                  className="h-(--ch) w-auto max-w-none transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div
                className="mt-4 text-[14px] leading-snug md:text-[15px]"
                style={{ width: `calc(var(--ch) * ${c.width / c.height})` }}
              >
                <p className="font-heading text-[17px] leading-[1.2] md:text-[19px]">{c.title}</p>
                <p className="mt-1.5 text-mulberry/70">
                  {c.issuer}
                  {c.date ? ` · ${c.date}` : ""}
                </p>
              </div>
            </button>
          </li>
        ))}
        <li aria-hidden className="w-px flex-none" />
      </ul>

      <div className="container-grid mt-8 md:mt-10">
        <div className="h-px w-full bg-mulberry/15">
          <div
            className="h-px origin-left bg-mulberry transition-transform duration-150"
            style={{ transform: `scaleX(${Math.max(progress, 0.04)})` }}
          />
        </div>
      </div>

      {open !== null && <Zoom index={open} onClose={close} onNav={nav} />}
    </div>
  );
}
