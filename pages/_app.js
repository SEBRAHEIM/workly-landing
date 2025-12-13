import "../styles/globals.css";
import AuthBadge from "../components/AuthBadge";

let SafeAuthProvider = ({ children }) => children;

try {
  const m = require("../components/AuthModal");
  SafeAuthProvider = m?.AuthProvider || m?.default || SafeAuthProvider;
} catch (e) {}

export default function App({ Component, pageProps }) {
  return (
    <SafeAuthProvider>
      <AuthBadge />
      <Component {...pageProps} />
    </SafeAuthProvider>
  );
}
