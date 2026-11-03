import type { Metadata } from "next";
import { Roboto, Tenor_Sans } from "next/font/google";
import BookingProvider from "@/components/BookingProvider";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto",
  display: "swap",
});

const tenor = Tenor_Sans({
  subsets: ["latin", "cyrillic"],
  weight: "400",
  variable: "--font-tenor",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LINA PM CODE — перманентный макияж",
  description:
    "Новый взгляд в индустрии перманентного макияжа. Скидка 25% на перманентный макияж любой зоны.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${roboto.variable} ${tenor.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <BookingProvider>{children}</BookingProvider>
      </body>
    </html>
  );
}
