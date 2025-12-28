export function Field({ label, children }) {
  return (
    <div style={{ marginTop: 14 }}>
      <div style={{ fontWeight: 900, marginBottom: 8 }}>{label}</div>
      {children}
    </div>
  )
}

export function Input(props) {
  return (
    <input
      {...props}
      style={{
        width: "100%",
        height: 52,
        borderRadius: 14,
        border: "1px solid rgba(0,0,0,.15)",
        padding: "0 14px",
        fontSize: 16,
        background: "rgba(234, 246, 200, .55)",
        boxSizing: "border-box",
        outline: "none",
        ...(props.style || {})
      }}
    />
  )
}

export function PrimaryButton({ children, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        height: 54,
        borderRadius: 999,
        border: "1px solid rgba(0,0,0,.12)",
        background: "#3b3a35",
        color: "#f4f0ea",
        fontWeight: 900,
        fontSize: 16,
        opacity: disabled ? .6 : 1,
        cursor: disabled ? "default" : "pointer"
      }}
    >
      {children}
    </button>
  )
}

export function SecondaryButton({ children, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        height: 54,
        borderRadius: 999,
        border: "1px solid rgba(0,0,0,.12)",
        background: "rgba(255,255,255,.55)",
        color: "rgba(45,42,36,.85)",
        fontWeight: 900,
        fontSize: 16,
        opacity: disabled ? .6 : 1,
        cursor: disabled ? "default" : "pointer"
      }}
    >
      {children}
    </button>
  )
}

export function Message({ text }) {
  if (!text) return null
  return (
    <div style={{
      marginTop: 14,
      padding: 12,
      borderRadius: 14,
      border: "1px solid rgba(180,0,0,.20)",
      background: "rgba(255, 170, 170, .22)",
      fontWeight: 900
    }}>
      {text}
    </div>
  )
}

export function Hint({ text }) {
  if (!text) return null
  return (
    <div style={{
      marginTop: 10,
      textAlign: "center",
      fontWeight: 900,
      opacity: .7
    }}>
      {text}
    </div>
  )
}
