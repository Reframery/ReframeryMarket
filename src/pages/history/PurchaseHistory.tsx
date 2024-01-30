import SideBar from "components/SideBar"
import AdminSideBar from "components/AdminSidebar"

import { useAuth } from "hooks/useAuth"

export default function PurchaseHistory() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="container history-container">
      <div className="columns">
        <div className="column is-one-quarter">
          {user.role === "ADMIN" ? <AdminSideBar /> : <SideBar />}
        </div>
        <div className="column is-three-quarters history-body">
          <div className="history-title mt-6">
            <h1 className="title is-1">Purchase History</h1>
          </div>
          <div className="history-records">
            <div className="columns is-vcenteres">
              <div className="column is-narrow">happy</div>

              <div className="column">happy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
