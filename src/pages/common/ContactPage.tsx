import SideBar from "components/SideBar"
import { useAuth } from "hooks/useAuth"

export default function ContactPage() {
  const { user } = useAuth()
  return (
    <div className="info-page">
      {user && user.role === "ADMIN" && <SideBar />}
      <div className="container">
        <h2>This is contact page</h2>
        <h2>Waiting for update from Reframery team...</h2>
      </div>
    </div>
  )
}
