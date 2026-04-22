import type { AppProps } from "next/app";
import { Archivo, Inter_Tight } from "next/font/google";
import "@/styles/globals.css";
import SiteBackground from "@/components/layout/site-background";
import Navbar from "@/components/layout/navbar";

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
      <SiteBackground>
        {/* <Navbar /> */}
        <Component {...pageProps} />
      </SiteBackground>
    </main>
  );
}