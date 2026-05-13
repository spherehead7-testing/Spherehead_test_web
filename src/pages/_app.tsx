import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import { Archivo, Inter_Tight } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/navbar";
import { ScrollContainerProvider } from "@/context/ScrollContainerContext";

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
      <ScrollContainerProvider>
        <Navbar />
        <Component {...pageProps} />
      </ScrollContainerProvider>
    </main>
  );
}