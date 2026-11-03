// Сертификаты: обработанные копии (обрезаны чёрные поля скриншотов) лежат в
// public/images/certificates/optimized, оригиналы — рядом в public/images/certificates.
export type Certificate = {
  file: string;
  width: number;
  height: number;
  title: string;
  issuer: string;
  date?: string;
};

const dir = "/images/certificates/optimized/";

export const CERTIFICATES: Certificate[] = [
  {
    file: "trigger.png",
    width: 905,
    height: 1280,
    title: "Тренерский курс Trigger по перманентному макияжу",
    issuer: "Академия перманентного макияжа",
    date: "05.07.2022",
  },
  {
    file: "alena-mann-lips.png",
    width: 905,
    height: 1280,
    title: "Губы: Nude, Velvet, Watercolor",
    issuer: "Alena Mann",
    date: "11.11.2022",
  },
  {
    file: "iv-professional.png",
    width: 800,
    height: 1200,
    title: "Онлайн-марафон Professional",
    issuer: "IV Professional, школа Ирины Волковой",
    date: "19.05.2022",
  },
  {
    file: "alena-mann-coloristics.png",
    width: 591,
    height: 838,
    title: "Coloristics & Touch up",
    issuer: "Alena Mann",
    date: "08.12.2021",
  },
  {
    file: "probrow-marathon.png",
    width: 1280,
    height: 904,
    title: "ProBrow Марафон: 14 экспертов Brow индустрии",
    issuer: "ProBrow",
    date: "08.10.2021",
  },
  {
    file: "probrow-lips.png",
    width: 591,
    height: 419,
    title: "Повышение квалификации: перманентный макияж губ",
    issuer: "PM&Brows Концентрат",
    date: "30.11.2021",
  },
  {
    file: "probrow-webinar-1.png",
    width: 591,
    height: 419,
    title: "Бархатный прокрас на губах",
    issuer: "PM&Brows Концентрат",
    date: "23.11.2021",
  },
  {
    file: "probrow-webinar-2.png",
    width: 591,
    height: 419,
    title: "Варианты эскиза на губах",
    issuer: "PM&Brows Концентрат",
    date: "22.11.2021",
  },
  {
    file: "mirus-long-lasting.png",
    width: 721,
    height: 526,
    title: "Долговременная укладка",
    issuer: "Mirus Academy",
    date: "21.10.2020",
  },
  {
    file: "mirus-brow-botox.png",
    width: 721,
    height: 525,
    title: "Ботокс бровей",
    issuer: "Mirus Academy",
    date: "21.10.2020",
  },
  {
    file: "mirus-brow-protein.png",
    width: 721,
    height: 526,
    title: "Протеиновое восстановление бровей",
    issuer: "Mirus Academy",
    date: "21.10.2020",
  },
  {
    file: "makeup-conference.png",
    width: 1280,
    height: 910,
    title: "Международная онлайн-конференция по перманентному макияжу",
    issuer: "Make Up Марафон",
    date: "06.2020",
  },
  {
    file: "surface.png",
    width: 591,
    height: 976,
    title: "Помадный и акварельный прокрас в авторской технике Surface",
    issuer: "Laboratory of your style",
  },
].map((c) => ({ ...c, file: dir + c.file }));
