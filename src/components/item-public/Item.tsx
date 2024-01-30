import { Link } from "react-router-dom"
import Rating from "../Rating"

type ItemProps = { item: MarketItem; community: string }

export default function Item(props: ItemProps) {
  const { item, community } = props

  const to = `/${community}/item/${item.id}`

  return (
    <div className="item">
      <div className="image">
        <Link to={to}>
          <img
            className="item-image"
            src={item.itemImage ?? ""}
            alt={item.itemName}
          ></img>
        </Link>
      </div>
      <div className="item-info">
        <div className="item-name">
          <Link to={to}>
            <span className="link">{item.itemName}</span>
          </Link>
        </div>
        <div className="item-price">${item.unitPrice}</div>
        <div className="item-rating">
          <Rating
            rating={item.averageRating ?? 0}
            numOfReviews={item.numberOfFeedbacks}
          />
        </div>
        <div className="item-city">
          {item.city} {item.province}
        </div>
      </div>
    </div>
  )
}
