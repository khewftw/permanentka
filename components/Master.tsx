import Image from "next/image";
import Certificates from "./Certificates";
import BookingTrigger from "./BookingTrigger";
import { MaskIcon } from "./icons";
import { CERTIFICATES } from "./certificates-data";
import Reveal from "./Reveal";

const STEPS = [
  {
    title: "Подбираем форму под ваше лицо",
    text: "Учитываем природную форму бровей или губ, особенности кожи и ваши пожелания.",
  },
  {
    title: "Согласуем эскиз до процедуры",
    text: "Вы заранее увидите предложенную форму. К внесению пигмента приступаем после согласования.",
  },
  {
    title: "Работаем с соблюдением санитарных требований",
    text: "Одноразовые расходные материалы, подходящие пигменты и соблюдение правил гигиены.",
  },
  {
    title: "Объясняем, как сохранить результат",
    text: "После процедуры выдаём рекомендации по уходу и рассказываем, как будет проходить заживление.",
  },
];

const CAN = [
  { icon: "sleep", text: "Продлить ваш сон" },
  { icon: "mirror", text: "Выгодно подчеркнуть достоинства" },
  { icon: "confidence", text: "Подарить вам уверенность в себе" },
  { icon: "anywhere", text: "Помочь выглядеть привлекательной всегда и везде" },
];

const STATS = [
  { value: "5+", label: "лет в перманентном макияже" },
  { value: "5000+", label: "выполненных процедур" },
  { value: String(CERTIFICATES.length), label: "сертификатов и курсов" },
];


export default function Master() {
  return (
    <section id="about" className="bg-white py-20 text-mulberry md:py-28">
      <div className="container-grid">
        {/* заголовок */}
        <Reveal className="flex flex-col items-center text-center">
          <p className="font-heading text-[18px] tracking-[0.08em] uppercase md:text-[20px]">
            ( 04 — Мастер и доверие )
          </p>
          <h2 className="font-heading mt-6 text-[26px] leading-[1.35] uppercase md:text-[clamp(30px,3.4vw,52px)] md:leading-[1.25]">
            <span className="block lg:whitespace-nowrap">
              Сначала согласуем <span className="text-lavender">форму и цвет.</span>
            </span>
            <span className="block lg:whitespace-nowrap">Только потом приступим к процедуре</span>
          </h2>
          <p className="mt-8 max-w-[640px] text-[16px] leading-relaxed text-mulberry/80 md:text-[18px]">
            Перманентный макияж — это не та процедура, где стоит полагаться на случай.
          </p>
        </Reveal>

        {/* 4 шага */}
        <ol className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.12} className="border-t border-mulberry/20 pt-6">
              <span className="font-heading text-[40px] leading-none text-lavender md:text-[56px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-heading mt-6 text-[20px] leading-[1.2] uppercase md:text-[22px]">
                {s.title}
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-mulberry/80">{s.text}</p>
            </Reveal>
          ))}
        </ol>

        {/* мастер */}
        <div className="mt-20 grid items-start gap-10 md:mt-28 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:items-stretch lg:gap-12 xl:grid-cols-[minmax(0,520px)_minmax(0,1fr)] xl:gap-16">
          <Reveal className="relative aspect-[4/5] w-full overflow-hidden bg-white lg:aspect-auto lg:min-h-full">
            <Image
              src="/images/about/about.png"
              alt="Лина — мастер перманентного макияжа"
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover object-top"
            />
          </Reveal>

          <Reveal delay={0.15}>
            <h3 className="font-heading text-[26px] leading-[1.15] uppercase md:text-[34px]">
              Ваш мастер — <span className="text-lavender">Лина</span>
            </h3>
            <p className="font-heading mt-4 text-[18px] leading-snug md:text-[22px]">
              Сертифицированный мастер по перманентному макияжу с опытом более 5 лет
            </p>

            <p className="mt-6 max-w-[640px] text-[15px] leading-relaxed text-mulberry/80 md:text-[17px]">
              Я люблю своих клиентов и люблю то, чем занимаюсь. Перманентный макияж помогает мне
              преображать девушек и женщин без пластических операций.
            </p>

            <p className="font-heading mt-7 text-[16px] tracking-[0.04em] uppercase md:text-[18px]">
              С помощью перманентного макияжа я могу
            </p>
            <ul className="mt-5 grid gap-x-10 gap-y-5 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {CAN.map((c) => (
                <li key={c.text} className="flex items-center gap-4">
                  <MaskIcon
                    src={`/icons/benefits/${c.icon}.svg`}
                    className="size-12 flex-none text-mulberry md:size-14"
                  />
                  <span className="text-[15px] leading-snug font-normal text-mulberry md:text-[17px]">
                    {c.text}
                  </span>
                </li>
              ))}
            </ul>

            <blockquote className="mt-7 max-w-[640px] border-l-2 border-lavender pl-5 text-[16px] leading-relaxed md:text-[18px]">
              Гарантирую индивидуальный подход, качество и сервис каждой из вас.
            </blockquote>

            <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-mulberry/20 py-5">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="font-heading text-[26px] leading-none md:text-[36px]">{s.value}</dt>
                  <dd className="mt-2 text-[12px] leading-snug text-mulberry/70 md:text-[14px]">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>

            <BookingTrigger
              className="cursor-pointer mt-8 inline-flex h-[60px] w-full items-center justify-center rounded bg-lavender px-10 text-[18px] uppercase btn-lift hover:bg-mulberry hover:text-lavender sm:w-auto"
            >
              Записаться к мастеру
            </BookingTrigger>
          </Reveal>
        </div>
      </div>

      {/* сертификаты — на всю ширину сетки */}
      <div className="mt-20 md:mt-28">
        <Reveal>
          <Certificates />
        </Reveal>
      </div>
    </section>
  );
}
