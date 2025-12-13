import "../styles/globals.css";
import AuthBadge from "../components/AuthBadge";
import AuthModal from "../components/AuthModal";
import { AuthProvider } from "../context/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AuthBadge />
      <AuthModal />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
