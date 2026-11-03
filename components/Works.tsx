"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { CASES, type CaseImage } from "./cases-data";
import { CloseIcon } from "./icons";
import BookingTrigger from "./BookingTrigger";
import Reveal from "./Reveal";

// Высота фото в ленте — синхронно с --h в классе секции
const H_MOBILE = 260;
const H_DESKTOP = 420;

function Row({
  items,
  dir,
  duration,
  onOpen,
}: {
  items: { img: CaseImage; index: number }[];
  dir: "left" | "right";
  duration: number;
  onOpen: (index: number, rect: DOMRect) => void;
}) {
  return (
    <div className="gallery-viewport" style={{ "--dur": `${duration}s` } as React.CSSProperties}>
      <div className="gallery-track" data-dir={dir}>
        {/* два одинаковых набора — бесшовный цикл на -50% */}
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-2.5 pr-2.5" aria-hidden={copy === 1}>
            {items.map(({ img, index }) => {
              const ratio = img.width / img.height;
              return (
                <button
                  key={img.src}
                  type="button"
                  tabIndex={copy === 1 ? -1 : 0}
                  onClick={(e) => onOpen(index, e.currentTarget.getBoundingClientRect())}
                  className="group flex-none cursor-zoom-in overflow-hidden rounded"
                  aria-label="Открыть фото"
                >
                  <Image
                    src={img.src}
                    alt=""
                    width={img.width}
                    height={img.height}
                    sizes={`(min-width: 768px) ${Math.round(H_DESKTOP * ratio)}px, ${Math.round(H_MOBILE * ratio)}px`}
                    className="h-(--h) w-auto max-w-none transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

const EASE = "cubic-bezier(0.2, 0.7, 0.2, 1)";

function Lightbox({
  index,
  fromRect,
  onClose,
  onNav,
}: {
  index: number;
  fromRect: DOMRect | null;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  const img = CASES[index];
  const dialogRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const lastIndex = useRef<number | null>(null);
  const closing = useRef(false);

  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Открытие: фото «вылетает» из миниатюры (FLIP); при листании — плавное появление
  useLayoutEffect(() => {
    const el = imgRef.current;
    if (!el || reduced() || lastIndex.current === index) return;
    const isFirst = lastIndex.current === null;
    lastIndex.current = index;
    if (isFirst && fromRect) {
      const to = el.getBoundingClientRect();
      const dx = fromRect.left - to.left;
      const dy = fromRect.top - to.top;
      const sx = fromRect.width / to.width;
      const sy = fromRect.height / to.height;
      el.style.transformOrigin = "top left";
      el.animate(
        [{ transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` }, { transform: "none" }],
        { duration: 550, easing: EASE },
      );
      dialogRef.current?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 350, easing: "ease-out" });
    } else if (!isFirst) {
      el.animate([{ opacity: 0, transform: "scale(0.97)" }, { opacity: 1, transform: "none" }], {
        duration: 300,
        easing: EASE,
      });
    }
  }, [index, fromRect]);

  // Закрытие: плавное затухание и лёгкое уменьшение
  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    const dialog = dialogRef.current;
    if (!dialog || reduced()) return onClose();
    imgRef.current?.animate(
      [{ transform: "none" }, { transform: "scale(0.92)" }],
      { duration: 250, easing: "ease-in", fill: "forwards" },
    );
    dialog
      .animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, easing: "ease-in", fill: "forwards" })
      .finished.then(onClose, onClose);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
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
  }, [close, onNav]);

  const arrow =
    "absolute top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-gallery/10 text-[22px] text-gallery transition-colors hover:bg-lavender hover:text-mulberry md:flex";

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Фото работы"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 md:p-10"
      onClick={close}
    >
      <button
        type="button"
        aria-label="Закрыть"
        onClick={close}
        className="absolute top-4 right-4 z-10 text-gallery md:top-8 md:right-8"
      >
        <CloseIcon className="size-9" strokeWidth={1.25} />
      </button>

      <button
        type="button"
        aria-label="Предыдущее фото"
        onClick={(e) => {
          e.stopPropagation();
          onNav(-1);
        }}
        className={`${arrow} left-8`}
      >
        ←
      </button>
      <button
        type="button"
        aria-label="Следующее фото"
        onClick={(e) => {
          e.stopPropagation();
          onNav(1);
        }}
        className={`${arrow} right-8`}
      >
        →
      </button>

      <div
        className="flex max-h-full w-full max-w-[1100px] flex-col items-center gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          ref={imgRef}
          src={img.src}
          alt=""
          width={img.width}
          height={img.height}
          sizes="100vw"
          className="max-h-[calc(100svh-190px)] w-auto max-w-full rounded object-contain md:max-h-[calc(100svh-210px)]"
        />
        <BookingTrigger
          onClick={onClose}
          className="cursor-pointer inline-flex h-[60px] w-full max-w-[460px] shrink-0 items-center justify-center rounded bg-lavender px-8 text-center text-[16px] text-mulberry uppercase btn-lift hover:bg-tidal"
        >
          Хочу записаться на такой результат
        </BookingTrigger>
      </div>
    </div>
  );
}

export default function Works() {
  const [open, setOpen] = useState<{ index: number; rect: DOMRect | null } | null>(null);

  // раскладываем фото по трём лентам через одно
  const rows = useMemo(
    () =>
      [0, 1, 2].map((r) =>
        CASES.map((img, index) => ({ img, index })).filter((_, i) => i % 3 === r),
      ),
    [],
  );

  const openAt = useCallback((index: number, rect: DOMRect) => setOpen({ index, rect }), []);
  const close = useCallback(() => setOpen(null), []);
  const nav = useCallback(
    (dir: 1 | -1) =>
      setOpen((o) =>
        o === null ? o : { index: (o.index + dir + CASES.length) % CASES.length, rect: o.rect },
      ),
    [],
  );

  return (
    <section
      id="works"
      className="overflow-hidden bg-mulberry py-20 text-gallery [--h:260px] md:py-28 md:[--h:420px]"
    >
      <div className="container-grid">
        <Reveal className="flex flex-col items-center text-center">
          <p className="font-heading text-[18px] tracking-[0.08em] uppercase md:text-[20px]">
            ( 03 — Реальные работы )
          </p>

          <h2 className="font-heading mt-6 max-w-[1000px] text-[26px] leading-[1.35] uppercase md:text-[clamp(30px,3.4vw,52px)] md:leading-[1.25]">
            Посмотрите, как выглядит перманент <span className="text-lavender">после заживления</span>
          </h2>

          <p className="mt-8 max-w-[640px] text-[16px] leading-relaxed text-gallery/80 md:text-[18px]">
            Не только красивые фотографии сразу после процедуры. Показываем реальные работы до
            перманента, сразу после и после заживления.
          </p>
        </Reveal>
      </div>

      <Reveal className="mt-14 flex flex-col gap-2.5 md:mt-20">
        <Row items={rows[0]} dir="right" duration={150} onOpen={openAt} />
        <Row items={rows[1]} dir="left" duration={170} onOpen={openAt} />
        <Row items={rows[2]} dir="right" duration={160} onOpen={openAt} />
      </Reveal>

      {open !== null && <Lightbox index={open.index} fromRect={open.rect} onClose={close} onNav={nav} />}
    </section>
  );
}
