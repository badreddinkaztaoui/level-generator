import type { AppProps } from "next/app";
// Styles
import "../styles/style.global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
