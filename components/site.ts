// Общие данные сайта: контакты и навигация (используются в хедере и футере)
export const NAV = [
  { href: "#about", label: "Обо мне" },
  { href: "#works", label: "Работы" },
  { href: "#services", label: "Услуги" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contacts", label: "Контакты" },
];

export const PHONE = "+7 (924) 205-25-02";
export const PHONE_HREF = "tel:+79242052502";
export const TELEGRAM = "https://t.me/";
export const MAX = "https://max.ru/";

// Адрес и график — временные (Казань), минимальная цена — как в блоке услуг
export const ADDRESS = "Казань, ул. Сибгата Хакима, 31";
export const HOURS = "с 9:00 до 21:00";
export const PRICE_FROM = "12 000";

// Акция: скидка и реальная дата окончания (как в hero: «до 30.11»)
export const PROMO_PERCENT = 25;
export const PROMO_DEADLINE = "2026-11-30T23:59:59+03:00";
export const PROMO_DEADLINE_LABEL = "30.11";

// Оператор персональных данных — заполнить реквизитами (нужны для политики конфиденциальности)
export const OPERATOR = {
  name: "[ФИО / наименование оператора]",
  inn: "[ИНН]",
  address: "[юридический адрес]",
  email: "[e-mail для обращений]",
};
