import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "app/store"
import { signOut } from "features/auth/authSlice"
import cart from "assets/cart.png"
import logo from "assets/logo.png"

export default function SideBar() {
  const currentPath = window.location.pathname
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const signOutHandler = () => {
    const r = window.confirm("Do you want to Sign Out?")
    if (r) {
      dispatch(signOut())
      navigate("/")
    }
  }

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="sidebar-logo">
          <Link className="link" to="/">
            <img src={logo} alt="sidebar logo" />
          </Link>
          <Link className="link" to="/">
            <h2 className="is-size-5">Marketplace</h2>
          </Link>
        </div>
        <p className="menu-label">
          <i className="fas fa-id-card"></i> <strong>Account</strong>{" "}
        </p>
        <ul className="menu-list">
          <li>
            <Link className="link" to="/my-profile">
              My Profile
            </Link>
          </li>
          <li>
            <Link className="link" to={currentPath} onClick={signOutHandler}>
              Sign Out
            </Link>
          </li>
        </ul>
        <p className="menu-label">
          <i className="fas fa-wallet"></i>
          <strong>Wallet</strong>
        </p>
        <ul className="menu-list">
          <li>
            <Link className="link" to="/my-wallet">
              My wallet
            </Link>
          </li>
        </ul>
        <p className="menu-label">
          <i className="fas fa-history"></i>
          <strong>History</strong>
        </p>
        <ul className="menu-list">
          <li>
            <Link className="link" to="/history/purchase">
              Purchase
            </Link>
          </li>
          <li>
            <Link className="link" to="/history/sales">
              Sales
            </Link>
          </li>
        </ul>
        <p className="menu-label">
          <i className="fas fa-list-alt"></i>
          <strong>My Items</strong>
        </p>
        <ul className="menu-list">
          <li>
            <Link className="link" to="/items">
              Items
            </Link>
          </li>
          <li>
            <Link className="link" to="/items/new">
              Create Item
            </Link>
          </li>
        </ul>
        <div className="cart-icon">
          <img src={cart} alt="shopping cart icon" />
          <div>
            {" "}
            <Link className="link" to="/cart">
              Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
