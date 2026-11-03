"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { ConsentCheckbox, formatPhone } from "./form-parts";
import { CloseIcon } from "./icons";
import PromoTimer from "./PromoTimer";
import { PROMO_DEADLINE, PROMO_DEADLINE_LABEL, PROMO_PERCENT } from "./site";

type OpenOptions = { service?: string };
const Ctx = createContext<(opts?: OpenOptions) => void>(() => {});

/** Открыть всплывающее окно записи из любого клиентского компонента */
export const useBooking = () => useContext(Ctx);

const field =
  "h-14 w-full rounded border-2 border-mulberry/15 bg-white px-5 text-[17px] text-mulberry outline-none transition-colors placeholder:text-mulberry/40 focus:border-mulberry";

function BookingModal({ service, onClose }: { service?: string; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const closing = useRef(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [promo] = useState(() => Date.now() < new Date(PROMO_DEADLINE).getTime());

  // плавное закрытие
  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !panel.current || !backdrop.current) return onClose();
    const opts = { duration: 220, easing: "ease-in", fill: "forwards" as const };
    panel.current.animate(
      [
        { opacity: 1, translate: "0 0" },
        { opacity: 0, translate: "0 24px" },
      ],
      opts,
    );
    backdrop.current.animate([{ opacity: 1 }, { opacity: 0 }], opts).finished.then(onClose, onClose);
  }, [onClose]);

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      backdrop.current?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, easing: "ease-out" });
      panel.current?.animate(
        [
          { opacity: 0, translate: "0 40px", scale: 0.97 },
          { opacity: 1, translate: "0 0", scale: 1 },
        ],
        { duration: 500, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)" },
      );
    }
    nameRef.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      // простая ловушка фокуса внутри окна
      if (e.key === "Tab" && panel.current) {
        const els = panel.current.querySelectorAll<HTMLElement>("a[href], button, input");
        if (!els.length) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.({ preventScroll: true });
    };
  }, [close]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return setError("Укажите ваше имя");
    if (phone.replace(/\D/g, "").length < 11) return setError("Укажите номер телефона полностью");
    if (!consent) return setError("Подтвердите согласие на обработку персональных данных");
    setError("");
    // TODO: отправка заявки (Telegram-бот, CRM или почта) — бэкенда пока нет.
    // В заявку нужно передать: name, phone, service, факт и время согласия.
    setSent(true);
  };

  return (
    <div
      ref={backdrop}
      className="fixed inset-0 z-[80] flex items-end justify-center overflow-y-auto bg-mulberry/60 backdrop-blur-md sm:items-center sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="relative my-auto w-full max-w-[560px] overflow-hidden rounded-t-xl bg-gallery text-mulberry shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)] sm:rounded-lg"
      >
        <button
          type="button"
          aria-label="Закрыть"
          onClick={close}
          className="icon-hover absolute top-4 right-4 z-10 text-mulberry"
        >
          <CloseIcon className="size-8" strokeWidth={1.25} />
        </button>

        {promo && !sent && (
          <div className="bg-lavender px-6 pt-6 pr-16 pb-5 sm:px-10">
            <p className="font-heading text-[18px] leading-tight uppercase md:text-[20px]">
              Скидка {PROMO_PERCENT}% на перманентный макияж любой зоны
            </p>
            <p className="mt-1 text-[13px] text-mulberry/80">
              При записи до {PROMO_DEADLINE_LABEL}. До конца акции осталось:
            </p>
            <PromoTimer className="mt-3" />
          </div>
        )}

        <div className="px-6 py-8 sm:px-10 sm:py-10">
          {sent ? (
            <div className="flex min-h-[280px] flex-col items-center justify-center gap-4 text-center">
              <p id="booking-title" className="font-heading text-[28px] uppercase">
                Спасибо, {name.trim()}!
              </p>
              <p className="max-w-[340px] text-[16px] leading-relaxed text-mulberry/80">
                Мы свяжемся с вами в ближайшее время, чтобы подобрать удобное время для записи
                {promo ? ` и закрепить скидку ${PROMO_PERCENT}%` : ""}.
              </p>
              <button
                type="button"
                onClick={close}
                className="btn-lift mt-4 inline-flex h-14 items-center justify-center rounded bg-lavender px-10 text-[16px] uppercase hover:bg-mulberry hover:text-lavender"
              >
                Закрыть
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="flex flex-col gap-4">
              <h2 id="booking-title" className="font-heading text-[26px] leading-[1.15] uppercase md:text-[32px]">
                Записаться на приём
              </h2>
              {service ? (
                <p className="-mt-1 text-[15px] text-mulberry/70">
                  Услуга: <span className="font-medium text-mulberry">{service}</span>
                </p>
              ) : (
                <p className="-mt-1 text-[15px] text-mulberry/70">
                  Оставьте контакты — мы перезвоним и подберём время.
                </p>
              )}

              <input
                ref={nameRef}
                className={`${field} mt-2`}
                placeholder="Ваше имя"
                autoComplete="name"
                aria-label="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className={field}
                placeholder="+7 (___) ___-__-__"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                aria-label="Номер телефона"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
              />

              <div className="mt-1">
                <ConsentCheckbox checked={consent} onChange={setConsent} tone="light" />
              </div>

              {error && (
                <p role="alert" className="text-[14px] text-mulberry">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="btn-lift mt-1 inline-flex h-16 w-full items-center justify-center rounded bg-mulberry px-8 text-[17px] text-gallery uppercase hover:bg-lavender hover:text-mulberry"
              >
                {promo ? `Записаться со скидкой ${PROMO_PERCENT}%` : "Записаться"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; service?: string }>({ open: false });
  const open = useCallback((opts?: OpenOptions) => setState({ open: true, service: opts?.service }), []);
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);

  return (
    <Ctx.Provider value={open}>
      {children}
      {state.open && <BookingModal service={state.service} onClose={close} />}
    </Ctx.Provider>
  );
}
