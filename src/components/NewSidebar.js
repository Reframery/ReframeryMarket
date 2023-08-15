import React from "react";
import logo from "img/logo.png";
import cart from "img/cart.png";

class NewSidebar extends React.Component {
    render (){
        return (

            <aside className="menu">
                <div className="sidebar-logo">
                    <img src={logo} alt="sidebar logo"/>
                    <h2 className="is-size-4">Marketplace</h2>
                </div>

                <p className="menu-label">
                    <i class="fas fa-id-card"></i>
                    <strong>Account</strong>
                </p>

                <ul className="menu-list">
                    <li><a>My profile</a></li>
                    <li><a>Log Out</a></li>
                </ul>

                <p className="menu-label">
                    <i class="fas fa-wallet"></i>
                    <strong>Wallet</strong>
                </p>

                <ul className="menu-list">
                    <li><a>Balance</a></li>
                    <li><a>Transactions</a></li>
                </ul>

                <p className="menu-label">
                    <i class="fas fa-history"></i>
                    <strong>History</strong>
                </p>

                <ul className="menu-list">
                    <li><a>Purchase</a></li>
                    <li><a>Sales</a></li>
                </ul>

                <div className="cart-icon">
                    <img src={cart} alt="shopping cart icon"/>
                    <h2 className="is-size-4">My Cart</h2>
                </div>
            </aside>
        )
    }
}

export default NewSidebar;