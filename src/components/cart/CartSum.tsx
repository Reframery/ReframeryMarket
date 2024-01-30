import { addTax } from "lib/utils";

export default function CartSum(props: { sumPrice: number; itemNum: number }) {
  const calcTotal = (sum: number) => addTax(sum) + sum;

  return (
    <div className="cart-right">
      <div className="box totals">
        <div className="totals-item">
          <label>Number of Items</label>
          <div className="totals-value is-size-5" id="cart-coupon">
            {props.itemNum}
          </div>
        </div>

        <div className="totals-item">
          <label>Subtotal</label>
          <div className="totals-value is-size-5">${props.sumPrice}</div>
        </div>

        <div className="totals-item" id="cart-subtotal">
          <label>Tax (13%)</label>
          <div className="totals-value is-size-5" id="cart-tax">
            ${addTax(props.sumPrice)}
          </div>
        </div>

        <div className="totals-item">
          <label>Grand Total</label>
          <div className="totals-value is-size-5" id="cart-total">
            <strong>${calcTotal(props.sumPrice)}</strong>
          </div>
        </div>
      </div>

      <div className="buttons">
        <a href="/address">
          <button className="button is-primary is-medium">Check Out</button>
        </a>

        <a href="/">
          <button className="button is-text is-normal">
            Continue Shopping
          </button>
        </a>
      </div>
    </div>
  );
}
