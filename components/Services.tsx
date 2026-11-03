import BookingTrigger from "./BookingTrigger";
import Reveal from "./Reveal";
import Image from "next/image";

const PRICE_PLACEHOLDER = "[цена]";

type Service = {
  title: string;
  image: string;
  text: string;
  cta: string;
  price: number;
  /** зачёркнутая старая цена (для акции) */
  oldPrice?: number;
  /** показывать «От» перед ценой */
  from?: boolean;
};

export const SERVICES: Service[] = [
  {
    title: "Макияж одной зоны",
    image: "/images/services/one-zone.png",
    text: "Губы, брови или веки — на ваш выбор. Подберём технику и оттенок под выбранную зону.",
    cta: "Записаться на одну зону",
    price: 11900,
    from: true,
  },
  {
    title: "Брови в волосковой технике",
    image: "/images/services/hair-brows.png",
    text: "Тонкие штрихи, повторяющие направление и рисунок натуральных волосков. Результат выглядит максимально естественно.",
    cta: "Записаться на брови",
    price: 12900,
    from: true,
  },
  {
    title: "Перманентный макияж двух зон",
    image: "/images/services/two-zones.png",
    text: "Сочетайте две зоны за один визит: например, брови и губы или брови и межресничку.",
    cta: "Записаться на две зоны",
    price: 17900,
    from: true,
  },
  {
    title: "Перманентный макияж full face",
    image: "/images/services/full-face.png",
    text: "Комплексный образ: брови, губы и межресничка в единой цветовой гамме и стилистике.",
    cta: "Записаться на full face",
    price: 23900,
    from: true,
  },
  {
    title: "Удаление ремувером",
    image: "/images/services/removal.png",
    text: "Аккуратно осветляем или убираем неудачный перманентный макияж. Объём работы оценивается на консультации.",
    cta: "Записаться на удаление",
    price: 3900,
    oldPrice: 7000,
  },
];

const rub = (n: number) => `${n.toLocaleString("ru-RU").replace(/\s/g, " ")} ₽`;

// Акцентное слово в заголовке: меняем только цвет
function Accent({ children }: { children: React.ReactNode }) {
  return <span className="text-lavender">{children}</span>;
}

export default function Services() {
  return (
    <section id="services" className="bg-gallery py-20 text-mulberry md:py-28">
      <div className="container-grid">
        <Reveal className="flex flex-col items-center text-center">
          <p className="font-heading text-[18px] tracking-[0.08em] uppercase md:text-[20px]">( 02 — Услуги и стоимость )</p>

          <h2 className="font-heading mt-6 text-[26px] leading-[1.35] uppercase md:text-[clamp(30px,3.4vw,52px)] md:leading-[1.25]">
            <span className="block lg:whitespace-nowrap">
              Брови <Accent>без карандаша</Accent>, губы <Accent>без помады</Accent>
            </span>
            <span className="block lg:whitespace-nowrap">
              Выразительный взгляд <Accent>без подводки</Accent>
            </span>
          </h2>

          <p className="mt-8 max-w-[640px] text-[16px] leading-relaxed text-mulberry/80 md:text-[18px]">
            Выберите зону, которую хотите подчеркнуть. Подберём технику, форму и оттенок с учётом
            ваших пожеланий и особенностей внешности.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-x-10 gap-y-14 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal as="li" key={s.title} delay={(i % 3) * 0.12} className="group @container flex min-w-0 flex-col">
              <div className="relative aspect-[4/3] overflow-hidden rounded bg-lavender/30">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="mt-6 flex flex-col gap-3 @[440px]:flex-row @[440px]:items-start @[440px]:justify-between @[440px]:gap-6">
                <h3 className="font-heading min-w-0 text-[24px] leading-[1.15] uppercase break-words xl:text-[28px]">
                  {s.title}
                </h3>
                <p className="flex shrink-0 items-baseline gap-3 @[440px]:flex-col @[440px]:items-end @[440px]:gap-1">
                  {s.oldPrice && (
                    <span className="font-heading text-[16px] leading-none line-through decoration-1 opacity-50">
                      {rub(s.oldPrice)}
                    </span>
                  )}
                  <span className="font-heading text-[26px] leading-none whitespace-nowrap">
                    {s.from && (
                      <span className="mr-1.5 font-sans text-[12px] tracking-[0.08em] uppercase opacity-70">
                        От
                      </span>
                    )}
                    {rub(s.price)}
                  </span>
                </p>
              </div>

              <p className="mt-4 mb-8 text-[16px] leading-relaxed text-mulberry/80">{s.text}</p>

              <BookingTrigger
                service={s.title}
                className="mt-auto cursor-pointer inline-flex h-[60px] w-full items-center justify-center rounded bg-lavender px-4 text-center text-[16px] uppercase btn-lift hover:bg-mulberry hover:text-lavender"
              >
                {s.cta}
              </BookingTrigger>
            </Reveal>
          ))}
        </ul>

        <Reveal as="p" className="mt-12 text-center text-[15px] text-mulberry/80 md:mt-16">
          Первая коррекция: <span className="font-medium">{PRICE_PLACEHOLDER} ₽</span>. Стоимость
          обсуждается до процедуры.
        </Reveal>
      </div>
    </section>
  );
}
