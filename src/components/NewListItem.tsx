import { useState, useEffect } from "react";
import axios from "lib/axios";
import NewItem from "components/NewItem";

type Props = {
  mainCategory: string;
  updateCartNum: () => Promise<void>;
};

export default function NewListItem(props: Props) {
  // set the initial state
  const [items, setItems] = useState<
    {
      id: number;
      name: string;
      image: string;
      price: number;
      description: string;
      rating: number;
      discount: number;
    }[]
  >([]);

  useEffect(() => {
    async function inner() {
      axios
        .get("/items?category=" + props.mainCategory + "&_limit=3")
        .then((response) => {
          setItems(response.data);
        });

      // Update Cart Number when this page is rendered for the first time
      await props.updateCartNum();
    }

    inner();
  }, [props]);

  return (
    <div className="listings-container">
      <h1 className="title is-1 has-text-centered">{props.mainCategory}</h1>

      <div className="columns is-multiline is-desktop">
        {items.map((i) => {
          return (
            <div className="column is-4" key={i.id}>
              <NewItem item={i} updateCartNum={props.updateCartNum} />
            </div>
          );
        })}
      </div>

      <div className="has-text-centered">
        <button className="button is-primary">View More</button>
      </div>
    </div>
  );
}
