import { useState, useEffect } from "react";
import ConfirmSum from "components/ConfirmSum";
import NewSidebar from "components//SideBar";
import axios from "lib/axios";
import { addTax } from "lib/utils";

// TODO: Rounding problem for calculations

export default function ConfirmPage() {
  // set initial state for current shopping cart
  const [orderItems, setOrderItems] = useState([]);
  const [orderSubtotal, setOrderSubtotal] = useState(0);

  useEffect(() => {
    axios.get("/cart").then((response) => {
      setOrderItems(response.data);
    });
  }, []);

  // function for calculating the sum price of certain item
  const sumPrice = (price: number, amount: number) => {
    return price * amount;
  };

  // function for calculating the total of certain item
  const itemTotal = (sum: number, tax: number) => {
    return sum + tax;
  };

  return (
    <div className="container confirm-container">
      <div className="columns">
        <div className="column is-one-quarter">
          <NewSidebar />
        </div>

        <div className="column is-half">
          <h1 className="title is-1">Confirm Information</h1>
          <progress className="progress" value="75" max="100">
            75%
          </progress>

          <div className="panel is-info">
            <p className="panel-heading">Shipping Details</p>

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
            <p className="panel-heading">Billing Address</p>

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
            <p className="panel-heading">Services / Products / Expertises</p>

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
                  {orderItems.map((i) => {
                    const { name, price, amount } = i;

                    const sum = sumPrice(price, amount);
                    const tax = addTax(sum);
                    const total = itemTotal(sum, tax);

                    setOrderSubtotal((prev) => prev + 1);

                    return (
                      <tr className="has-text-centered">
                        <th>{name}</th>
                        <td>${price}</td>
                        <td>{amount}</td>
                        <td>{sum}</td>
                        <td>+${tax}</td>
                        <td>
                          <strong>${total}</strong>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="column is-one-quarter">
          <ConfirmSum subtotal={orderSubtotal} />
        </div>
      </div>
    </div>
  );
}
