import { useAuth } from "hooks/useAuth";
import SideBar from "components/SideBar";

export default function DevelopmentTeamPage() {
  const { user } = useAuth()
  return (
    <div className="info-page">
      {user && user.role === "ADMIN" && <SideBar />}
      <div className="container">
        <h2>This web site is developed by team Aquafina.</h2>
      </div>
    </div>
  );
}
