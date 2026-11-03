import BookingForm from "./BookingForm";
import Reveal from "./Reveal";
import { MaxIcon, PhoneIcon, TelegramIcon } from "./icons";
import { ADDRESS, HOURS, MAX, PHONE, PHONE_HREF, PRICE_FROM, TELEGRAM } from "./site";

const label = "text-[14px] tracking-[0.08em] uppercase text-gallery/60";

export default function Booking() {
  return (
    <section id="contacts" className="bg-mulberry py-20 text-gallery md:py-28">
      <div className="container-grid flex flex-col items-center text-center">
        <Reveal as="p" className="font-heading text-[18px] tracking-[0.08em] uppercase md:text-[20px]">
          ( 06 — Финальная запись )
        </Reveal>
        <Reveal as="h2" delay={0.1} className="font-heading mt-6 max-w-[1100px] text-[28px] leading-[1.25] uppercase md:text-[clamp(32px,3.4vw,52px)]">
          Запишитесь на перманентный макияж в Казани от{" "}
          <span className="text-lavender">{PRICE_FROM}&nbsp;₽</span>
        </Reveal>
        <Reveal as="p" delay={0.2} className="mt-6 max-w-[620px] text-[16px] leading-relaxed md:text-[18px]">
          Подберём подходящую технику, обсудим будущую форму и оттенок, согласуем стоимость и удобную
          дату.
        </Reveal>

        <Reveal className="mt-12 w-full max-w-[920px] md:mt-16">
          <BookingForm />
        </Reveal>

        {/* контакты — крупно, по центру */}
        <Reveal className="mt-16 grid w-full max-w-[1100px] gap-10 border-t border-gallery/20 pt-12 md:mt-24 md:grid-cols-3 md:gap-8 md:pt-16">
          <div>
            <p className={label}>Адрес студии</p>
            <p className="font-heading mt-4 text-[24px] leading-snug md:text-[28px]">{ADDRESS}</p>
          </div>
          <div>
            <p className={label}>Время работы</p>
            <p className="font-heading mt-4 text-[24px] leading-snug md:text-[28px]">{HOURS}</p>
          </div>
          <div>
            <p className={label}>Телефон</p>
            <a
              href={PHONE_HREF}
              className="font-heading link-underline mt-4 inline-flex items-center gap-3 text-[24px] leading-snug md:text-[28px]"
            >
              <PhoneIcon className="size-7" />
              {PHONE}
            </a>
          </div>
        </Reveal>

        <Reveal className="mt-12 flex items-center gap-5">
          <a
            href={TELEGRAM}
            aria-label="Telegram"
            className="flex size-20 items-center justify-center rounded-full border-2 border-gallery/40 btn-lift hover:border-lavender hover:bg-lavender hover:text-mulberry md:size-24"
          >
            <TelegramIcon className="size-9 md:size-11" />
          </a>
          <a
            href={MAX}
            aria-label="Max"
            className="flex size-20 items-center justify-center rounded-full border-2 border-gallery/40 btn-lift hover:border-lavender hover:bg-lavender hover:text-mulberry md:size-24"
          >
            <MaxIcon className="size-9 md:size-11" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
