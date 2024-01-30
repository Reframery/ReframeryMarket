import { toast } from "react-toastify";
import axios from "lib/axios";

type Props = {
  item: {
    id: number;
    name: string;
    image: string;
    price: number;
    description: string;
    rating: number;
    discount: number;
  };
  updateCartNum: () => Promise<void>;
};

export default function NewItem(props: Props) {
  // Add this item to shopping cart
  const addCart = async () => {
    try {
      // get necessary attributes for shopping cart
      const { id, name, image, price, description, discount } = props.item;

      // Query to see if there is existing item in the cart
      const response = await axios.get("cart/?itemID=" + id);
      const records = response.data;

      // Determine if there is existing item in the cart
      if (records && records.length > 0) {
        // get the first record
        const record = records[0];
        // increment the amount by one
        record.amount += 1;
        // Edit the record at the backend
        await axios.put("cart/" + record.id, record);
      } else {
        // new Shopping Cart record
        const new_record = {
          itemID: id,
          name,
          image,
          price,
          description,
          discount,
          amount: 1,
        };

        // post to Json Server backend
        axios.post("/cart", new_record);
      }
      // Prompt the user for success
      toast.success("Add to Cart Successfully!");
      // update cart num when succeeds
      await props.updateCartNum();
    } catch (error) {
      toast.error("Failed to add the item");
    }
  };

  // get props from NewListItem component
  const { name, image, rating, price, description } = props.item;

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">{name}</p>

        <button className="card-header-icon" aria-label="Discount">
          <span className="icon">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </header>

      <div className="card-image">
        <figure className="image is-4by3">
          <img src={image} alt={name} />
        </figure>
      </div>

      <div className="card-content">
        <div className="card-price">${price}</div>

        <div className="card-rating">Rating: {rating}</div>

        <div className="content">{description}</div>
      </div>

      <div className="card-footer">
        <button className="card-footer-item" onClick={addCart}>
          Add to Cart
        </button>
        <a href="/#" className="card-footer-item">
          View Details
        </a>
      </div>
    </div>
  );
}
