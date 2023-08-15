import React from "react";
import axios from "commons/axios";

class CartCard extends React.Component {

   constructor(props) {
       super(props);
       this.state = {
        itemNum: this.props.card_item.amount
       }
       this.handelChange = this.handelChange.bind(this);
       this.handleDelete = this.handleDelete.bind(this);
   }

   // function to handle any changes in the number of the item
   handelChange (e){
       // get the new number
       const _amount = parseInt(e.target.value);

       // set the state to the new number
       this.setState({
           itemNum: _amount
       });

       // new cart record to be sent to the backend
       const newCart = {
           ...this.props.card_item,
           amount: _amount
       };

       // put the new record to the backend
       axios.put("/cart/"+this.props.card_item.id, newCart).then(res => {
           // update the calculations on the the shopping cart page
           this.props.update(newCart);
       })
   }

   // function to delete the item from shopping cart
   handleDelete(){
       // delete the record from the backend
       axios.delete("/cart/"+this.props.card_item.id).then(res => {
           // update the calculations on the shopping cart page
           this.props.delete(this.props.card_item);
       })
   }


    render (){

        // get props for rendering the shopping cart
        const { name, image, description, discount, price, amount } = this.props.card_item;

        return (
            <div className="box">
                <article className="media">

                    <div className="media-left">
                        <figure className="image is-64x64">
                            <img src={image} alt={name}/>
                        </figure>
                    </div>

                    <div className="media-content">
                        <div className="content">
                            <p>
                                <strong>{name}</strong>
                                <div class="dropdown is-hoverable">
                                    <div class="dropdown-trigger">
                                        <span class="icon is-small">
                                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                                        <div class="dropdown-content">
                                            <div class="dropdown-item">
                                                <p>Discount Available:</p>
                                                <p>
                                                    <strong>{discount}</strong> to save your money.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                {description}
                            </p>
                        </div>    
                    </div>

                    <div className="media-right">
                        <div className="card-price">
                            Unit Price: ${price}
                        </div>
                        <div className="num-input">
                            <input class="input" type="number" min={1} defaultValue={amount} onChange={this.handelChange}/>
                        </div>

                        <div className="remove-button">
                            <button className="button is-text is-normal" onClick={this.handleDelete}>
                                Remove from Cart
                            </button>
                        </div>

                    </div>
                </article>
            </div>
        )
    }
}

export default CartCard;