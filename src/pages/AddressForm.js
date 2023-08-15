import React from "react";
import Sidebar from "components/SideBar";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import Shipping from "components/Shipping";
import Billing from "components/Billing";
import Header from "components/Header";
import NewSidebar from "components/NewSidebar";

class AddressForm extends React.Component {
    render (){
        return (
            <div>
                <Header />
                <div className="container address-form-container">
                    <div className="columns">
                        <div className="column is-one-quarter">
                            <NewSidebar />
                        </div>

                        <div className="column is-half">
                            <h1 className="title is-1">Shipping Address</h1>
                            <progress class="progress" value="50" max="100">50%</progress>
                            <Shipping />
                            <div className="buttons address-buttons">
                                <a href="/confirm">
                                    <button className="button is-primary is-primary is-medium">
                                        Final Confirmation
                                    </button>
                                </a>
                                <button className="button is-text is-normal">
                                    <a href="/cart">Go Back</a>
                                </button>
                            </div>
                        </div>

                        <div className="column is-one-quarter">
                            <h1 className="title is-1">Billing</h1>
                            <div className="billing-container">
                                <Billing />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddressForm;