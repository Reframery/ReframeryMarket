import React from "react";
import Item from "./Item";

export default function ListItem(props) {
  const { community,itemList } = props;
  return (
    <div className="itemlist-container">
      {itemList.length === 0 ? <div className="has-text-centered py-4">Items Not Found</div>: <div className="list-items">
        {itemList.map((item) => (
          <Item key={item.id} item={item} community={community}></Item>
        ))}
      </div>
}
    </div>
  );
}
