import { Nunito, Playfair_Display } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  title: "Comé rico, gastá poco",
  description: "Meal prep dominical + recetas rápidas entre semana",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${nunito.variable} ${playfair.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
