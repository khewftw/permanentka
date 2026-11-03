"use client";

import { useState } from "react";
import { ConsentCheckbox, formatPhone } from "./form-parts";

const SERVICES = ["Перманент бровей", "Перманент губ", "Межресничка", "Нужна консультация"];

const field =
  "h-16 w-full rounded border-2 border-gallery/20 bg-gallery/10 px-6 text-[18px] text-gallery outline-none transition-colors placeholder:text-gallery/60 focus:border-lavender md:h-[72px] md:text-[20px]";

export default function BookingForm() {
  const [selected, setSelected] = useState<string[]>([SERVICES[0]]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected.length) return setError("Выберите хотя бы одну услугу");
    if (name.trim().length < 2) return setError("Укажите ваше имя");
    if (phone.replace(/\D/g, "").length < 11) return setError("Укажите номер телефона полностью");
    if (!consent) return setError("Подтвердите согласие на обработку персональных данных");
    setError("");
    // TODO: отправка заявки (Telegram-бот, CRM или почта) — бэкенда пока нет
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 text-center">
        <p className="font-heading text-[28px] uppercase md:text-[36px]">Спасибо, {name.trim()}!</p>
        <p className="max-w-[360px] text-[16px] leading-relaxed text-gallery/80">
          Мы свяжемся с вами, чтобы подобрать удобное время для записи.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-8">
      <fieldset>
        <legend className="font-heading mx-auto text-center text-[22px] uppercase md:text-[28px]">
          Выберите услугу
        </legend>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:gap-4">
          {SERVICES.map((s) => {
            const on = selected.includes(s);
            return (
              <label
                key={s}
                className={`relative flex h-16 cursor-pointer items-center gap-4 rounded border-2 px-6 text-[18px] transition-colors md:h-[72px] md:text-[20px] ${
                  on ? "border-lavender bg-lavender text-mulberry" : "border-gallery/30 hover:border-lavender"
                }`}
              >
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={on}
                  onChange={() =>
                    setSelected((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]))
                  }
                />
                <span
                  aria-hidden
                  className={`flex size-7 flex-none items-center justify-center rounded-sm border-2 text-[16px] leading-none transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lavender ${
                    on ? "border-mulberry bg-mulberry text-lavender" : "border-gallery/50"
                  }`}
                >
                  {on && "✓"}
                </span>
                {s}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-3 sm:grid-cols-2 md:gap-4">
        <label className="block">
          <span className="sr-only">Ваше имя</span>
          <input
            className={field}
            placeholder="Ваше имя"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="sr-only">Номер телефона</span>
          <input
            className={field}
            placeholder="+7 (___) ___-__-__"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
          />
        </label>
      </div>

      {error && (
        <p role="alert" className="-mt-2 text-center text-[15px] text-lavender">
          {error}
        </p>
      )}

      <div className="mx-auto w-full max-w-[560px]">
        <ConsentCheckbox checked={consent} onChange={setConsent} tone="dark" />
      </div>

      <button
        type="submit"
        className="mx-auto inline-flex h-[72px] w-full max-w-[560px] items-center justify-center rounded bg-lavender px-8 text-[18px] text-mulberry uppercase btn-lift hover:bg-gallery md:h-20 md:text-[20px]"
      >
        Подобрать время для записи
      </button>

    </form>
  );
}
