import React from "react";

class CartSum extends React.Component {

    rate = 0.1;

    addTax (sum){
        return Math.round(sum * this.rate);
    }

    calcTotal (sum){
        return Math.round(sum * this.rate) + sum;
    }


    render (){
        return (
            <div className="cart-right">
                <div className="box totals">


                    <div className="totals-item">
                        <label>
                            Number of Items
                        </label>
                        <div className="totals-value is-size-5" id="cart-coupon">{this.props.itemNum}</div>
                    </div>


                    <div className="totals-item">
                        <label>
                            Subtotal
                        </label>
                        <div className="totals-value is-size-5">${this.props.sumPrice}</div>
                    </div>

                    <div className="totals-item" id="cart-subtotal">
                        <label>
                            Tax (13%)
                        </label>
                        <div className="totals-value is-size-5" id="cart-tax">${this.addTax(this.props.sumPrice)}</div>
                    </div>

                    <div className="totals-item">
                        <label>
                            Grand Total
                        </label>
                        <div className="totals-value is-size-5" id="cart-total">
                            <strong>${this.calcTotal(this.props.sumPrice)}</strong>
                        </div>
                    </div>
                </div>

                <div className="buttons">
                    <a href="/address-form">
                        <button className="button is-primary is-medium">
                            Check Out
                        </button>
                    </a>

                    <a href="/">
                        <button className="button is-text is-normal">
                            Continue Shopping
                        </button>
                    </a>
                </div>
            </div>
        )
    }
}

export default CartSum;