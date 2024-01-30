import logo from "assets/logo.png";
import cart from "assets/cart.png";

export default function NewSidebar() {
  return (
    <aside className="menu">
      <div className="sidebar-logo">
        <img src={logo} alt="sidebar logo" />
        <h2 className="is-size-4">Marketplace</h2>
      </div>

      <p className="menu-label">
        <i className="fas fa-id-card"></i>
        <strong>Account</strong>
      </p>

      <ul className="menu-list">
        <li>My profile</li>
        <li>Log Out</li>
      </ul>

      <p className="menu-label">
        <i className="fas fa-wallet"></i>
        <strong>Wallet</strong>
      </p>

      <ul className="menu-list">
        <li>Balance</li>
        <li>Transactions</li>
      </ul>

      <p className="menu-label">
        <i className="fas fa-history"></i>
        <strong>History</strong>
      </p>

      <ul className="menu-list">
        <li>Purchase</li>
        <li>Sales</li>
      </ul>

      <div className="cart-icon">
        <img src={cart} alt="shopping cart icon" />
        <h2 className="is-size-4">My Cart</h2>
      </div>
    </aside>
  );
}
