"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Props = {
  as?: React.ElementType;
  className?: string;
  /** задержка появления в секундах (для каскада) */
  delay?: number;
  children?: ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "className" | "children">;

/**
 * Плавное появление элемента при прокрутке.
 * Без JS и для элементов, уже видимых при загрузке, контент остаётся на месте — ничего не мигает.
 */
export default function Reveal({ as = "div", className = "", delay = 0, children, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"init" | "hidden" | "shown">("init");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // уже в зоне видимости при загрузке — не скрываем
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) return;

    setState("hidden");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style: CSSProperties | undefined = delay ? { transitionDelay: `${delay}s` } : undefined;

  const Tag = as;
  return (
    <Tag
      {...rest}
      ref={ref}
      className={`reveal ${className}`}
      data-state={state === "hidden" ? "hidden" : undefined}
      style={style}
    >
      {children}
    </Tag>
  );
}
