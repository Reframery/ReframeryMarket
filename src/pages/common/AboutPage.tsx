import { useAuth } from "hooks/useAuth";
import SideBar from "components/SideBar";

export default function AboutPage() {
  const { user } = useAuth()

  return (
    <div className="info-page">
      {user && user.role === "ADMIN" && <SideBar />}
      <div className="container">
        <h2>This is about page</h2>
        <h2>Waiting for update from Reframery team...</h2>
      </div>
    </div>
  );
}
