import React from 'react'
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Item(props) {
    const { item, community } = props;
    const category = item.category
    return (
        <div key={item.id} className="item">
            <div className="image">
                <Link to={(category === "products") ? "/" + community + "/products/" + item.id :
                    ((category === "services") ? "/" + community + "/services/" + item.id :
                        "/" + community + "/expertises/" + item.id)}>
                    <img
                        className="item-image"
                        src={item.imageURL}
                        alt={item.name}
                    ></img>
                </Link>
            </div>
            <div className="item-info">
                <div className="item-name">
                    <Link to={(category === "Products") ? "/" + community + "/products/" + item.id :
                        (category === "Services") ? "/" + community + "/services/" + item.id :
                            "/" + community + "/expertises/" + item.id}>
                        <span className="link">{item.name}</span>
                    </Link>
                </div>
                <div className="item-price">${item.price}</div>
                <div className="item-rating"><Rating rating={item.averageRating} numOfReviews={item.numberOfFeedbacks}></Rating></div>
                <div className="item-city">{item.city}, {item.province}</div>
            </div>
        </div>
    )
}
