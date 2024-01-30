import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "hooks/useAuth"
import { isAdmin } from "lib/auth"
import WelcomeComponent from "components/WelcomeComponent"

export default function AuthLayout() {
  const { user } = useAuth()

  if (user)
    return (
      <Navigate
        to={isAdmin(user) ? "/admin" : `/${user.marketProfile.communityName}`}
      />
    )
  return (
    <div className="welcome-container">
      <WelcomeComponent />
      <div className="w-[400px] ml-12 m-auto h-auto">
        <Outlet />
      </div>
    </div>
  )
}
