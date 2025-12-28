import "../styles/workly.css"
export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html, body {
          padding: 0;
          margin: 0;
          background: #efe9df;
          color: #2f2c27;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
          overscroll-behavior: none;
        }
        * { box-sizing: border-box; }
        a { color: inherit; text-decoration: none; }
        button { font-family: inherit; }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
