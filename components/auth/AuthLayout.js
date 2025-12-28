export default function AuthLayout({ children }) {
  return (
    <div style={{
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      background: "#efe9df",
      padding: 18,
      overflow: "hidden"
    }}>
      <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
        {children}
      </div>
    </div>
  )
}
