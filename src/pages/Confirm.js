import React from "react";
import Navbar from "components/Navbar";
import Sidebar from "components/SideBar";
import Footer from "components/Footer";
import ConfirmSum from "components/ConfirmSum";
import Header from "components/Header";
import NewSidebar from "components//SideBar";
import axios from "commons/axios";

// TODO:
// Rounding problem for calculations

class Confirm extends React.Component {

    // set initial state for current shopping cart
    state = {
        order_items: [],
    }

    //　calculating the order subtotal
    order_subtotal = 0;

    // get ordered items from the back end
    componentDidMount (){
        axios.get("/cart").then(response => {
            this.setState({
                order_items: response.data
            })
        }
        )
    }

    // function for calculating the sum price of certain item
    sumPrice (price, amount){
        return price * amount;
    }

    // function for calculating the tax of certain item
    addTax (sum){
        return Math.round(sum * 0.1);
    }

    // function for calculating the total of certain item
    itemTotal (sum, tax){
        return sum + tax;
    }
    
    render (){
        return (
            <div>
                <Header />
                <div className="container confirm-container">
                    <div className="columns">
                        <div className="column is-one-quarter">
                            <NewSidebar />
                        </div>

                        <div className="column is-half">
                            <h1 className="title is-1">Confirm Information</h1>
                            <progress class="progress" value="75" max="100">75%</progress>
                            
                            <div className="panel is-info">
                                <p className="panel-heading">
                                    Shipping Details
                                </p>

                                <div className="panel-body">
                                    <dl className="dl-horizontal">
                                        <dt>Name:</dt>
                                        <dd>Micheal Lee</dd>
                                        <dt>Address:</dt>
                                        <dd>16 Stroud Rd, Hamilton, ON, CA</dd>
                                        <dt>Phone Number:</dt>
                                        <dd>08077237890</dd>
                                        <dt>Email Address:</dt>
                                        <dd>reframery@gmail.com</dd>
                                    </dl>
                                </div>
                            </div>

                            <div className="panel is-info">
                                <p className="panel-heading">
                                    Billing Address
                                </p>

                                <div className="panel-body">
                                    <dl className="dl-horizontal">
                                        <dt>Name:</dt>
                                        <dd>Reframery</dd>
                                        <dt>Address:</dt>
                                        <dd>1280 Main St. W., Hamilton, ON, CA</dd>
                                        <dt>Phone Number:</dt>
                                        <dd>12345678</dd>
                                        <dt>Email Address:</dt>
                                        <dd>reframery2@gmail.com</dd>
                                    </dl>
                                </div>
                            </div>

                            <div className="panel is-info">
                                <p className="panel-heading">
                                    Services / Products / Expertises
                                </p>

                                <div className="table-container confirm-table">
                                    <table className="table is-hoverable is-fullwidth">
                                        <thead>
                                            <tr>
                                                <th>Item</th>
                                                <th>Price</th>
                                                <th>Number</th>
                                                <th>Sum</th>
                                                <th>Tax</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.order_items.map(i => {
                                                const { name, price, amount } = i;

                                                const sum = this.sumPrice(price,amount);
                                                const tax = this.addTax(sum);
                                                const total = this.itemTotal(sum, tax);

                                                this.order_subtotal += total;

                                                return (
                                                    <tr className="has-text-centered">
                                                    <th>{name}</th>
                                                    <td>${price}</td>
                                                    <td>{amount}</td>
                                                    <td>{sum}</td>
                                                    <td>+${tax}</td>
                                                    <td><strong>${total}</strong></td>
                                                    </tr>
                                                )
                                            })} 
                                        </tbody>
                                        
                                    </table>
                                </div>
                                       
                            </div>

                        </div>

                        <div className="column is-one-quarter">
                            <ConfirmSum subtotal={this.order_subtotal} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Confirm;