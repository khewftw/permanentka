import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const PhoneIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} fill="currentColor" {...p}>
    <path d="M5 3h3.5l1.8 4.6-2.3 1.4a12 12 0 0 0 6 6l1.4-2.3L20 14.5V18a2 2 0 0 1-2 2A15 15 0 0 1 3 5a2 2 0 0 1 2-2Z" />
  </svg>
);

// Брендовые иконки мессенджеров: public/icons/messengers/*.svg.
// Рисуем через mask, чтобы цвет задавался через currentColor (text-*).
export function MaskIcon({ src, className = "" }: { src: string; className?: string }) {
  const mask = `url(${src}) center / contain no-repeat`;
  return (
    <span
      aria-hidden
      className={`inline-block bg-current ${className}`}
      style={{ mask, WebkitMask: mask }}
    />
  );
}

type IconProps = { className?: string };

export const TelegramIcon = ({ className }: IconProps) => (
  <MaskIcon src="/icons/messengers/telegram.svg" className={className} />
);

export const MaxIcon = ({ className }: IconProps) => (
  <MaskIcon src="/icons/messengers/max.svg" className={className} />
);

export const MenuIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

export const CloseIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M5 5l14 14M19 5 5 19" />
  </svg>
);

export const PinIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
  </svg>
);

export const StarIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <path d="m12 2 2.9 6.6 7.1.7-5.3 4.8 1.5 7-6.2-3.6-6.2 3.6 1.5-7L2 9.3l7.1-.7L12 2Z" />
  </svg>
);
