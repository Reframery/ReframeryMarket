import { Outlet, Navigate } from "react-router-dom"
import { isAdmin } from "lib/auth"
import { useAuth } from "hooks/useAuth"
import Sidebar from "components/AdminSidebar"

export default function AdminLayout() {
  const { user } = useAuth()

  return user && isAdmin(user) ? (
    <div className="flex flex-grow">
      <Sidebar />
      <div className="text-lg flex-1 max-w-5xl mx-auto my-6">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  )
}
