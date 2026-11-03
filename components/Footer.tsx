import Reveal from "./Reveal";
import BookingTrigger from "./BookingTrigger";
import { MaxIcon, PhoneIcon, TelegramIcon } from "./icons";
import { SERVICES } from "./Services";
import { ADDRESS, HOURS, MAX, NAV, PHONE, PHONE_HREF, TELEGRAM } from "./site";

const MENU = [...NAV.filter((n) => n.href !== "#contacts"), { href: "#faq", label: "Вопросы" }, { href: "#contacts", label: "Контакты" }];

// TODO: подставить координаты студии (долгота,широта). Сейчас — центр Казани.
const MAP_LL = "49.108795,55.796289";
const MAP_SRC = `https://yandex.ru/map-widget/v1/?ll=${encodeURIComponent(MAP_LL)}&z=15&pt=${encodeURIComponent(MAP_LL)}%2Cpm2rdm`;

const heading = "font-heading text-[16px] tracking-[0.08em] uppercase text-lavender";
const link = "link-underline";

export default function Footer() {
  return (
    <footer className="border-t border-gallery/15 bg-mulberry text-gallery">
      <div className="container-grid py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.4fr_1.3fr] lg:gap-10">
          <Reveal>
            <a href="#" className="font-heading text-[26px] tracking-[0.04em] uppercase md:text-[30px]">
              LINA PM CODE
            </a>
            <p className="mt-5 max-w-[280px] text-[15px] leading-relaxed text-gallery/70">
              Перманентный макияж бровей, губ и межреснички. Естественный результат и индивидуальный
              подход.
            </p>
            <BookingTrigger
              className="cursor-pointer mt-8 inline-flex h-14 items-center justify-center rounded bg-lavender px-8 text-[16px] text-mulberry uppercase btn-lift hover:bg-tidal"
            >
              Записаться
            </BookingTrigger>
          </Reveal>

          <Reveal as="nav" delay={0.1} aria-label="Меню">
            <p className={heading}>Меню</p>
            <ul className="mt-5 grid gap-3 text-[15px]">
              {MENU.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className={link}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="nav" delay={0.2} aria-label="Услуги">
            <p className={heading}>Услуги</p>
            <ul className="mt-5 grid gap-3 text-[15px]">
              {SERVICES.map((s) => (
                <li key={s.title}>
                  <a href="#services" className={link}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.3}>
            <p className={heading}>Контакты</p>
            <ul className="mt-5 grid gap-4 text-[15px] leading-snug">
              <li>
                <span className="text-gallery/60">Адрес: </span>
                {ADDRESS}
              </li>
              <li>
                <span className="text-gallery/60">Время работы: </span>
                {HOURS}
              </li>
              <li>
                <a href={PHONE_HREF} className={`inline-flex items-center gap-2 text-[17px] ${link}`}>
                  <PhoneIcon className="size-5" />
                  {PHONE}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <a href={TELEGRAM} aria-label="Telegram" className="icon-hover">
                  <TelegramIcon className="size-7" />
                </a>
                <a href={MAX} aria-label="Max" className="icon-hover">
                  <MaxIcon className="size-7" />
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        {/* карта Яндекса */}
        <Reveal className="mt-14 overflow-hidden rounded md:mt-20">
          <iframe
            title="Студия на карте Яндекса"
            src={MAP_SRC}
            loading="lazy"
            className="block h-[320px] w-full border-0 md:h-[400px]"
            allowFullScreen
          />
        </Reveal>

        {/* противопоказания и юридическое */}
        <Reveal className="mt-14 border-t border-gallery/20 pt-10 md:mt-16">
          <p className="font-heading text-center text-[18px] leading-snug tracking-[0.04em] uppercase md:text-[24px]">
            Имеются противопоказания. Необходимо проконсультироваться со специалистом
          </p>
          <div className="mt-8 flex flex-col gap-4 text-[13px] leading-relaxed text-gallery/60 md:flex-row md:items-start md:justify-between md:gap-16">
            <p className="max-w-[640px]">
              Данный сайт носит информационный характер и не является публичной офертой,
              определяемой положениями статьи 437 (2) ГК РФ. Результат процедуры индивидуален.
            </p>
            <div className="flex flex-col gap-2 md:items-end md:text-right">
              <a href="/privacy" className="underline underline-offset-2 hover:text-gallery">
                Политика конфиденциальности
              </a>
              <p>© 2026 LINA PM CODE</p>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
