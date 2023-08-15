import React from "react";

document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
  
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }
  
  });

class Navbar extends React.Component {

    render() {
        return (
            <nav className="navbar is-primary" role="navigation" aria-label="main navigaiton">
                <div className="navbar-brand">
                    <a href="/" className="navbar-item">
                        <img src="y" alt="Reframery-logo"/>
                    </a>

                    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="reframery-menu">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div className="navbar-menu" id="reframery-menu">
                    <div className="navbar-start">
                        <a href="/" className="navbar-item">
                            Home
                        </a>

                        <a href="/about" className="navbar-item">
                            About
                        </a>

                        <a href="/contact" className="navbar-item">
                            Contact
                        </a>
                    </div>
                    
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <a href="/sign-up" className="button is-primary">
                                    <strong>Sign up</strong>
                                </a>

                                <a href="/cart" className="button is-light">
                                    Cart ({this.props.cartNum})
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;