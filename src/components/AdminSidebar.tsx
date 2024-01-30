import { Link } from "react-router-dom"

export default function AdminSidebar() {
  return (
    <div className="p-8 bg-gray-100">
      <Link to="/">
        <img className="logo" src="/images/logo.png" alt="logo" width="100" />
      </Link>
      <div className="text-lg font-semibold">
        <Link to="/admin">
          <div className="link my-3"> My Admin</div>
        </Link>
        <Link to="/admin/awaiting-validation">
          <div className="link my-3">Awaiting Validation</div>
        </Link>
        {/* The following two links are shown only for a super admin */}
        <Link to="/admin/search-user">
          <div className="link my-3">Search Users</div>
        </Link>
        <Link to="/my-profile">
          <div className="link">Account Setting</div>
        </Link>
      </div>
    </div>
  )
}
