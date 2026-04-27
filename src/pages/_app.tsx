import type { AppProps } from "next/app";
import { Archivo, Inter_Tight } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${archivo.variable} ${interTight.variable}`}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
    </main>
  );
}