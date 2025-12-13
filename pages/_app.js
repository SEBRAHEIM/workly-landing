import "../styles/globals.css";
import AuthBadge from "../components/AuthBadge";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthBadge />
      <Component {...pageProps} />
    </>
  );
}
