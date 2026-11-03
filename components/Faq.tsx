"use client";

import { useId, useState } from "react";
import Reveal from "./Reveal";

const FAQ: { q: string; a: string[] }[] = [
  {
    q: "Больно ли делать перманентный макияж?",
    a: [
      "Для уменьшения неприятных ощущений применяется подходящая местная анестезия. Чувствительность индивидуальна: во время процедуры могут ощущаться покалывание, царапание или давление. Полностью исключить боль нельзя.",
    ],
  },
  {
    q: "Не будут ли брови слишком тёмными?",
    a: [
      "Цвет и форму подбираем индивидуально. Сразу после процедуры оттенок может выглядеть ярче, чем после заживления. Окончательный результат оценивают спустя несколько недель.",
    ],
  },
  {
    q: "Сколько держится перманентный макияж?",
    a: [
      "Ориентировочно 1–3 года до заметного осветления. На стойкость влияют тип кожи, техника, пигмент и уход. Остаточный пигмент иногда сохраняется значительно дольше.",
    ],
  },
  {
    q: "Обязательно ли делать коррекцию?",
    a: [
      "Первую коррекцию часто рекомендуют через 4–8 недель. Она позволяет при необходимости выровнять оттенок или добавить насыщенности. Решение принимается по зажившему результату.",
    ],
  },
  {
    q: "Сбривают ли собственные брови?",
    a: [
      "Нет. Перед обычной процедурой перманентного макияжа брови сбривать не требуется. Собственные волоски сохраняются.",
    ],
  },
  {
    q: "Сколько заживает перманент?",
    a: [
      "Поверхностное заживление обычно занимает 7–10 дней. Возможны лёгкое шелушение, покраснение и временное изменение насыщенности цвета. Окончательный оттенок обычно оценивают через 4–6 недель.",
    ],
  },
  {
    q: "Как подготовиться к процедуре?",
    a: [
      "За 1–2 недели избегайте агрессивных пилингов и лазерных процедур в рабочей зоне, согласовав сроки со специалистом.",
      "Накануне исключите алкоголь. Перед процедурой сообщите мастеру о заболеваниях, аллергиях и принимаемых препаратах. Назначенные врачом лекарства самостоятельно не отменяйте.",
      "При склонности к герпесу перед перманентом губ обсудите с врачом необходимость противовирусной профилактики.",
    ],
  },
  {
    q: "Как ухаживать после процедуры?",
    a: [
      "Не трите обработанную кожу и не сдирайте корочки. В период заживления избегайте бассейна, сауны, декоративной косметики на обработанной зоне и активного солнечного воздействия.",
      "Подробную памятку по очищению и уходу выдадим после процедуры.",
    ],
  },
  {
    q: "Какие есть противопоказания?",
    a: [
      "Процедуру следует отложить при беременности, грудном вскармливании, простуде с температурой, активном герпесе и воспалениях кожи.",
      "При диабете, нарушениях свёртываемости крови, склонности к келоидным рубцам, эпилепсии, онкологических и других тяжёлых заболеваниях, приёме системных ретиноидов требуется предварительная оценка противопоказаний, при необходимости — консультация врача.",
      "Менструация сама по себе не является абсолютным противопоказанием, но чувствительность может повышаться.",
    ],
  },
  {
    q: "Можно ли исправить старый перманент?",
    a: [
      "Зависит от остаточного цвета, глубины пигмента и состояния кожи. Пришлите фотографию старого перманента — мастер оценит, возможно ли перекрытие или сначала потребуется удаление.",
    ],
  },
];

function Item({ q, a }: { q: string; a: string[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="border-b border-mulberry/20">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
        >
          <span className="font-heading text-[19px] leading-[1.25] transition-colors group-hover:text-mulberry/70 md:text-[22px]">
            {q}
          </span>
          {/* плюс превращается в крестик */}
          <span
            aria-hidden
            className={`relative flex size-10 flex-none items-center justify-center rounded-full border transition-colors duration-500 ${
              open ? "border-lavender bg-lavender" : "border-mulberry/30 group-hover:border-mulberry"
            }`}
          >
            <span className="absolute h-px w-4 bg-mulberry" />
            <span
              className={`absolute h-4 w-px bg-mulberry transition-transform duration-500 ease-out ${
                open ? "rotate-90" : ""
              }`}
            />
          </span>
        </button>
      </h3>

      <div
        id={id}
        role="region"
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-3 pb-7 text-[16px] leading-relaxed text-mulberry/80 md:pr-16 md:text-[17px]">
            {a.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  // две независимые колонки: раскрытие в одной не сдвигает другую
  const half = Math.ceil(FAQ.length / 2);
  const cols = [FAQ.slice(0, half), FAQ.slice(half)];

  return (
    <section id="faq" className="bg-gallery py-20 text-mulberry md:py-28">
      <div className="container-grid">
        <Reveal className="flex flex-col items-center text-center">
          <p className="font-heading text-[18px] tracking-[0.08em] uppercase md:text-[20px]">
            ( 05 — Вопросы перед записью )
          </p>
          <h2 className="font-heading mt-6 text-[26px] leading-[1.35] uppercase md:text-[clamp(30px,3.4vw,52px)] md:leading-[1.25]">
            <span className="block lg:whitespace-nowrap">Больно ли? Сколько держится?</span>
            <span className="block lg:whitespace-nowrap">
              А если результат <span className="text-lavender">не понравится?</span>
            </span>
          </h2>
        </Reveal>

        <div className="mt-14 grid items-start gap-x-16 md:mt-20 lg:grid-cols-2">
          {cols.map((col, i) => (
            <Reveal key={i} delay={i * 0.15} className={`border-mulberry/20 ${i ? "lg:border-t" : "border-t"}`}>
              {col.map((f) => (
                <Item key={f.q} {...f} />
              ))}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
