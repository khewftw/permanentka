"use client";

import type { ReactNode } from "react";
import { useBooking } from "./BookingProvider";

/** Кнопка, открывающая всплывающее окно записи (вместо перехода к форме внизу страницы) */
export default function BookingTrigger({
  className,
  service,
  onClick,
  children,
}: {
  className?: string;
  service?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const open = useBooking();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onClick?.();
        open({ service });
      }}
    >
      {children}
    </button>
  );
}
