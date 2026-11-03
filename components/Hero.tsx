import { getImageProps } from "next/image";
import BookingTrigger from "./BookingTrigger";
import Header from "./Header";

export default function Hero() {
  const common = { alt: "", fill: true, priority: true, quality: 85, sizes: "100vw" } as const;
  const {
    props: { srcSet: desktopSet },
  } = getImageProps({ ...common, src: "/images/hero/hero-pc.png" });
  const {
    props: { srcSet: mobileSet, ...img },
  } = getImageProps({ ...common, src: "/images/hero/hero-mobile.png" });

  return (
    <section className="relative flex min-h-[calc(80svh-var(--promo-h))] flex-col overflow-hidden bg-black text-gallery md:min-h-[80svh]">
      <picture>
        <source media="(min-width: 768px)" srcSet={desktopSet} />
        <source srcSet={mobileSet} />
        <img {...img} alt="" className="hero-zoom absolute inset-0 size-full object-cover object-[50%_20%]" />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/55" />

      <Header />

      <div className="container-grid relative z-10 mt-auto flex flex-col items-center pt-56 pb-14 text-center md:pb-16">
        <p className="rise mb-5 text-[13px] tracking-[0.04em] uppercase md:hidden" style={{ "--d": "0.15s" } as React.CSSProperties}>
          Эстетика. Индивидуальность. Точность
        </p>

        <h1 style={{ "--d": "0.25s" } as React.CSSProperties} className="rise font-heading sr-only md:not-sr-only md:max-w-[1200px] md:text-[56px] md:leading-[1.1] md:uppercase">
          Новый взгляд в индустрии перманентного макияжа
        </h1>

        <p style={{ "--d": "0.4s" } as React.CSSProperties} className="rise font-heading max-w-[340px] text-[24px] leading-[1.25] uppercase md:mt-4 md:max-w-[560px] md:text-[22px] md:leading-[1.35]">
          Получите <span className="text-tidal md:bg-tidal md:text-mulberry md:px-2 md:py-0.5">скидку 25%</span> на
          перманентный макияж любой зоны
        </p>

        <div className="rise mt-6 md:mt-7" style={{ "--d": "0.55s" } as React.CSSProperties}>
          <BookingTrigger className="btn-lift inline-flex h-[60px] cursor-pointer items-center justify-center rounded bg-lavender px-10 text-[18px] text-mulberry uppercase hover:bg-tidal">
            Записаться со скидкой
          </BookingTrigger>
        </div>
        <p className="rise mt-4 text-[13px]" style={{ "--d": "0.7s" } as React.CSSProperties}>
          *действует при записи до 30.11
        </p>
      </div>
    </section>
  );
}
