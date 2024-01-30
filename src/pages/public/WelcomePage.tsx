import { Link } from "react-router-dom"
import Footer from "components/Footer"
import WelcomeComponent from "../../components/WelcomeComponent"

export default function WelcomePage() {
  return (
    <>
      <div className="welcome-container flex-grow self-stretch">
        <WelcomeComponent />
        <div className="right">
          <div className="text">First, let's make sure we serve your area.</div>
          <div className="communities">
            <div className="community">
              <Link className="logo-canada" to="/canada">
                <img src="/images/logo_canada.png" alt="logo"></img>
              </Link>
              <Link className="canada" to="/canada">
                <div className="country">Canada</div>
              </Link>
            </div>
            <div className="community">
              <Link className="logo-usa" to="/usa">
                <img src="/images/logo_usa.png" alt="logo"></img>
              </Link>
              <Link className="usa" to="/usa">
                <div className="country">U.S.A</div>
              </Link>
            </div>
            <div className="community">
              <Link className="logo-brazil" to="/brazil">
                <img src="/images/logo_brazil.png" alt="logo"></img>
              </Link>
              <Link className="brazil" to="/brazil">
                <div className="country">Brazil</div>
              </Link>
            </div>
            <div className="community">
              <Link className="logo-mexico" to="/mexico">
                <img src="/images/logo_mexico.png" alt="logo"></img>
              </Link>
              <Link className="mexico" to="/mexico">
                <div className="country">Mexico</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
