import React from "react";
import Navbar from "components/Navbar";
import NewListItem from "components/NewListItem";
import axios from "commons/axios";

class Landing extends React.Component {

    // state for updating cart number
    state = {
        cartNum: 0
    }

    // function to update cart number
    updateCartNum = async () => {

        // set the cart number in the state
        const cartNum = await this.initCartNum()
        this.setState({
            cartNum: cartNum
        })
    }

    // function to get initial cart number
    initCartNum = async() => {
        const response = await axios.get("/cart")
        const records = response.data || []
        const cartNum = records.map(record => record.amount).reduce((acc, value) => acc + value, 0)
        return cartNum
    }
    

    render (){
        return (
            <div>
                <section className="hero is-large is-full-height-with-navbar">
                    {/*-- Hero head will stick at the top of the landing page --*/}
                    <div className="hero-head">
                        <Navbar cartNum={this.state.cartNum} />
                    </div>

                    {/*-- Hero Body will be in the middle --*/}
                    <div className="hero-body">
                        <div className="container has-text-left">
                            <div className="column is-5 is-offset-7">
                                <div className="slogan-container">
                                    <h1 className="has-text-weight-bold is-size-1">
                                        One of the best community marketplaces to support your business
                                    </h1>
                                </div>

                                <div className="buttons is-left">
                                    <button className="button is-primary is-rounded">
                                        <span className="icon">
                                            <i className="fas fa-sign-in-alt"></i>
                                        </span>
                                        <span>
                                            Sign In
                                        </span>
                                    </button>

                                    <button className="button">
                                        Continue as guest
                                    </button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </section>

                <section className="homepage-listings">
                    <div className="list-products" >
                        <NewListItem mainCategory="Products" updateCartNum={this.updateCartNum} />
                    </div>
                    <div className="list-services" >
                        <NewListItem mainCategory="Services" updateCartNum={this.updateCartNum} />
                    </div>
                    <div className="list-expertises">
                        <NewListItem mainCategory="Expertises" updateCartNum={this.updateCartNum} />
                    </div>
                </section>
            </div>
        )
    }
}

export default Landing; 