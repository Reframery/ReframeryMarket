import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "hooks/useAuth"
import Header from "components/Header"
import Footer from "components/Footer"

export default function ProtectedLayout() {
  const { user } = useAuth()
  const location = useLocation()

  if (user)
    return (
      <>
        <Header community={user.marketProfile.communityName ?? ""} />
        <Outlet />
        <Footer />
      </>
    )
  return <Navigate to="/login" state={{ from: location }} />
}
