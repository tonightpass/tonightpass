import "@/styles/globals.css";
import { client } from "@tonightpass/react";
import type { AppProps } from "next/app";

client.setOptions({ baseURL: "http://localhost:8000" });

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
