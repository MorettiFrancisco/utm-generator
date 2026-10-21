import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// El TDS v2 pide una sola familia de texto: Inter. next/font la auto-hostea,
// así que no hay request a Google en runtime.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tecnom Link — Generador de links de WhatsApp con UTM",
  description:
    "Armá links de WhatsApp para concesionarias con los parámetros UTM de la guía de Tecnom, listos para medir el origen de cada lead en Tecnom Sales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // La variable de la fuente va en <html> y no en <body>: `--tds-font` se
    // declara en :root y referencia a --font-inter, así que tiene que existir
    // ahí o la custom property computa inválida y nunca se aplica Inter.
    <html lang="es" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
