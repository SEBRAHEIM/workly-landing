import { useEffect } from "react"
import { useRouter } from "next/router"
export default function OnboardingChecklist() {
  const r = useRouter()
  useEffect(() => { r.replace("/dashboard") }, [r])
  return null
}
