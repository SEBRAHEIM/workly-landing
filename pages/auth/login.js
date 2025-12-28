import { useEffect } from "react"
import { useRouter } from "next/router"

export default function Login() {
  const r = useRouter()
  useEffect(() => { r.replace("/auth/email") }, [r])
  return null
}
