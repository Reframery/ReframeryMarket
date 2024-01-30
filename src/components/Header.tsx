import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from "app/store"
import { signOut } from "features/auth/authSlice"
import SearchBar from "./SearchBar"
import { useAuth } from "hooks/useAuth"

export default function Header(props: { community: string; cartNum?: number }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentPath = window.location.pathname

  const { community } = props

  const { user } = useAuth()

  const userCommunity = user?.marketProfile.communityName ?? community

  const username = user?.marketProfile.username ?? ""

  const signOutHandler = () => {
    const r = window.confirm("Do you want to Sign Out?")
    if (r) {
      dispatch(signOut())
      navigate("/")
      window.location.reload()
    }
  }

  return (
    <header className="flex items-center p-4 bg-[#c9168d]">
      <div className="navbar-logo">
        <Link to="/">
          <img className="w-12" src="/images/logo.png" alt="logo" />
        </Link>
      </div>
      <div className="ml-10 mr-auto space-x-6">
        <Link
          to={"/" + userCommunity}
          className="text-white text-lg hover:text-white/80 transition"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-white text-lg hover:text-white/80 transition"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="text-white text-lg hover:text-white/80 transition"
        >
          Contact
        </Link>
      </div>
      <div className="navbar-search">
        <SearchBar community={userCommunity} />
      </div>
      <div className="navbar-end">
        {/* if the user sign in, then show the user name, else show the link of sign in */}
        {user ? (
          <div className="dropdown">
            {user.role === "ADMIN" ? (
              <Link to="/admin" className="text-white text-lg hover:text-white/80 transition">
                {username} <i className="fa fa-caret-down"></i>
              </Link>
            ) : (
              <Link to={"/" + userCommunity + "/products"} className="text-white text-lg hover:text-white/80 transition">
                {username} <i className="fa fa-caret-down"></i>
              </Link>
            )}
            <ul className="dropdown-content">
              <Link className="link" to={currentPath} onClick={signOutHandler}>
                Sign out
              </Link>
            </ul>
          </div>
        ) : (
          <div>
            <Link to="/signin">
              <span className="nav-item link">Signin</span>
            </Link>
            <Link to="/register">
              <span className="nav-item link">Register</span>
            </Link>
            <Link to="/cart">
              <span className="nav-item link">Cart({props.cartNum ?? 0})</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
