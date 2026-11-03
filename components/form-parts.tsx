"use client";

// Общие части форм записи: маска телефона и согласие на обработку персональных данных (152-ФЗ)

/** +7 (999) 123-45-67 */
export function formatPhone(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("8") || d.startsWith("7")) d = d.slice(1);
  d = d.slice(0, 10);
  let out = "+7";
  if (d.length) out += " (" + d.slice(0, 3);
  if (d.length >= 3) out += ")";
  if (d.length > 3) out += " " + d.slice(3, 6);
  if (d.length > 6) out += "-" + d.slice(6, 8);
  if (d.length > 8) out += "-" + d.slice(8, 10);
  return out;
}

/**
 * Явное согласие: чекбокс по умолчанию выключен, ссылка на политику открывается в новой вкладке,
 * чтобы не потерять заполненную форму.
 */
export function ConsentCheckbox({
  checked,
  onChange,
  tone,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  tone: "dark" | "light";
}) {
  const dark = tone === "dark";
  return (
    <label className="flex cursor-pointer items-start gap-3 text-left">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span
        aria-hidden
        className={`mt-0.5 flex size-6 flex-none items-center justify-center rounded-sm border-2 text-[14px] leading-none transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 ${
          dark ? "peer-focus-visible:outline-lavender" : "peer-focus-visible:outline-mulberry"
        } ${
          checked
            ? dark
              ? "border-lavender bg-lavender text-mulberry"
              : "border-mulberry bg-mulberry text-lavender"
            : dark
              ? "border-gallery/50"
              : "border-mulberry/50"
        }`}
      >
        {checked && "✓"}
      </span>
      <span className={`text-[13px] leading-snug md:text-[14px] ${dark ? "text-gallery/70" : "text-mulberry/70"}`}>
        Я даю{" "}
        <a
          href="/privacy#consent"
          target="_blank"
          rel="noopener"
          className="underline underline-offset-2 hover:opacity-70"
        >
          согласие на обработку персональных данных
        </a>{" "}
        и принимаю{" "}
        <a
          href="/privacy"
          target="_blank"
          rel="noopener"
          className="underline underline-offset-2 hover:opacity-70"
        >
          политику конфиденциальности
        </a>
      </span>
    </label>
  );
}
