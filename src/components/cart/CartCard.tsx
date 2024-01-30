import React, { useState } from "react"
import axios from "lib/axios"

type CardItem = {
  amount: number
  id: string
  price: number
  discount: number
  image: string
  name: string
  description: string
}

type Props = {
  card_item: CardItem
  delete: (cardItem: CardItem) => void
  update: (cardItem: CardItem) => void
}

export default function CartCard(props: Props) {
  const [itemNum, setItemNum] = useState(props.card_item.amount)

  // function to handle any changes in the number of the item
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // get the new number
    const _amount = parseInt(e.target.value)

    setItemNum(_amount)

    // new cart record to be sent to the backend
    const newCart = {
      ...props.card_item,
      amount: _amount,
    }

    // put the new record to the backend
    axios.put("/cart/" + props.card_item.id, newCart).then(() => {
      // update the calculations on the the shopping cart page
      props.update(newCart)
    })
  }

  // function to delete the item from shopping cart
  const handleDelete = () => {
    // delete the record from the backend
    axios.delete("/cart/" + props.card_item.id).then(() => {
      // update the calculations on the shopping cart page
      props.delete(props.card_item)
    })
  }

  // get props for rendering the shopping cart
  const { name, image, description, discount, price, amount } = props.card_item

  return (
    <div className="box">
      <article className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <img src={image} alt={name} />
          </figure>
        </div>

        <div className="media-content">
          <div className="content">
            <p>
              <strong>{name}</strong>
              <div className="dropdown is-hoverable">
                <div className="dropdown-trigger">
                  <span className="icon is-small">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </div>
                <div className="dropdown-menu" id="dropdown-menu4" role="menu">
                  <div className="dropdown-content">
                    <div className="dropdown-item">
                      <p>Discount Available:</p>
                      <p>
                        <strong>{discount}</strong> to save your money.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              {description}
            </p>
          </div>
        </div>

        <div className="media-right">
          <div className="card-price">Unit Price: ${price}</div>
          <div className="num-input">
            <input
              className="input"
              type="number"
              min={1}
              defaultValue={amount}
              value={itemNum}
              onChange={handleChange}
            />
          </div>

          <div className="remove-button">
            <button className="button is-text is-normal" onClick={handleDelete}>
              Remove from Cart
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}
