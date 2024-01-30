import { Link } from "react-router-dom"
import { isAdmin } from "lib/auth"
import { useCartQuery } from "app/services/cart"
import { useAuth } from "hooks/useAuth"

import LoadingBox from "../../components/ui/LoadingBox"
import MessageBox from "../../components/ui/MessageBox"
import SideBar from "components/SideBar"
import AdminSideBar from "components/AdminSidebar"
import { handleRTKError } from "lib/utils"

export default function CartPage() {
  const { user } = useAuth()
  const { data: cart, error, isLoading: loading } = useCartQuery()

  return (
    <div>
      <div className="container cart">
        <div className="columns">
          <div className="column is-one-quarter">
            {user && (isAdmin(user) ? <AdminSideBar /> : <SideBar />)}
          </div>
          <div className="column is-half cart-body">
            <h1 className="title is-1">Shopping Cart</h1>
            <progress className="progress" value="25" max="100">
              25%
            </progress>
          </div>
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{handleRTKError(error)}</MessageBox>
          ) : cart ? (
            <div>
              {cart.length < 1 && <p>No Items found</p>}
              {cart.map((item) => (
                <div key={item.id}>
                  <p>Count: {item.count}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <Link to="/address">Next</Link>
      </div>
    </div>
  )
}
