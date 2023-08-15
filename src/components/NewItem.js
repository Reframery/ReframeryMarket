import React from "react";
import axios from "commons/axios";
import { toast } from "react-toastify";

class NewItem extends React.Component {

    // Add this item to shopping cart
    addCart = async () => {

        try {
            // get necessary attributes for shopping cart
            const {id, name, image, price, description, discount} = this.props.item;

            // Query to see if there is existing item in the cart
            const response = await axios.get("cart/?itemID="+id);
            const records = response.data;

            // Determine if there is existing item in the cart
            if (records && records.length > 0) {
                // get the first record
                const record = records[0];
                // increment the amount by one
                record.amount += 1;
                // Edit the record at the backend
                await axios.put("cart/"+record.id, record);
            }else{
                // new Shopping Cart record
                const new_record = {
                itemID: id,
                name,
                image,
                price,
                description,
                discount,
                amount: 1
                }

                // post to Json Server backend
                axios.post("/cart", new_record);
            }
            // Prompt the user for success
            toast.success("Add to Cart Successfully!");
            // update cart num when succeeds
            this.props.updateCartNum();
        }catch(error){
            // If failed
            toast.error("Failed to add the item");
        }
    }

    render(){

        // get props from NewListItem component
        const {name, image, rating, price, stock, description, discount} = this.props.item

        return(
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">
                        {name}
                    </p>


                    <button className="card-header-icon" aria-label="Discount">
                        <span className="icon">
                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </button>
                </header>

                <div className="card-image">
                    <figure className="image is-4by3">
                    <img src={image} alt="Placeholder image" />
                    </figure>
                </div>

                <div className="card-content">
                    <div className="card-price">
                        ${price}
                    </div>

                    <div className="card-rating">
                        Rating: {rating}
                    </div>

                    <div className="content">
                        {description}
                    </div>
                </div>

                <div className="card-footer">
                    <a class="card-footer-item" onClick={this.addCart}>Add to Cart</a>
                    <a href="#" class="card-footer-item">View Details</a>
                </div>

            </div>
        )
    }
}

export default NewItem;