import { useEffect } from "react"
import { useRouter } from "next/router"
export default function OnboardingUsername() {
  const r = useRouter()
  useEffect(() => { r.replace("/auth/username") }, [r])
  return null
}
