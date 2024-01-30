import { useState } from "react";
import Navbar from "components/Navbar";
import NewListItem from "components/NewListItem";
import axios from "lib/axios";

export default function Landing() {
  const [cartNum, setCartNum] = useState(0);

  // function to update cart number
  const updateCartNum = async () => {
    // set the cart number in the state
    setCartNum(await initCartNum());
  };

  // function to get initial cart number
  const initCartNum = async () => {
    const response = await axios.get("/cart");
    const records = response.data || [];
    const cartNum = records
      .map((record: { amount: number }) => record.amount)
      .reduce((acc: number, value: number) => acc + value, 0);
    return cartNum;
  };

  return (
    <div>
      <section className="hero is-large is-full-height-with-navbar">
        <div className="hero-head">
          <Navbar cartNum={cartNum} />
        </div>
        <div className="hero-body">
          <div className="container has-text-left">
            <div className="column is-5 is-offset-7">
              <div className="slogan-container">
                <h1 className="has-text-weight-bold is-size-1">
                  One of the best community marketplaces to support your
                  business
                </h1>
              </div>
              <div className="buttons is-left">
                <button className="button is-primary is-rounded">
                  <span className="icon">
                    <i className="fas fa-sign-in-alt"></i>
                  </span>
                  <span>Sign In</span>
                </button>
                <button className="button">Continue as guest</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="homepage-listings">
        <div className="list-products">
          <NewListItem mainCategory="Products" updateCartNum={updateCartNum} />
        </div>
        <div className="list-services">
          <NewListItem mainCategory="Services" updateCartNum={updateCartNum} />
        </div>
        <div className="list-expertises">
          <NewListItem
            mainCategory="Expertises"
            updateCartNum={updateCartNum}
          />
        </div>
      </section>
    </div>
  );
}
