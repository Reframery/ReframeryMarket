import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { deleteItem } from "../actions/itemActions";


export default function CreatedItem(props) {
    const dispatch = useDispatch();

    const removeItem = (e, itemID) => {
        e.preventDefault();
        const confirm = window.confirm("Are you sure to remove this item for sale?");
        if (confirm) {
            dispatch(deleteItem(itemID));
            window.location.reload();
        }

    };

    const { item } = props;
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    //console.log("Image: " + JSON.stringify(item));

    return (
        <div className="item">
            {userInfo ? (<Link to={item.id}>
                <img
                    className="item-image"
                    src={item.imageURL}
                    alt={item.name}
                ></img>
            </Link>) : (<Link to="/signin">
                <img
                    className="item-image"
                    src={item.imageURL}
                    alt={item.name}
                ></img>
            </Link>)}

            <div className="item-info">
                <form>
                    <h2>
                        {userInfo ? (<Link to={item.id}>
                            <span className="link">{item.name.toUpperCase()}</span>
                        </Link>) : (<Link to="/signin">
                            <span className="link">{item.name.toUpperCase()}</span>
                        </Link>)}
                    </h2>
                    <div className="item-price">${item.price}</div>
                    <button
                        type="submit"
                        className="button is-primary"
                        onClick={(e) => removeItem(e, item.id)}
                    >
                        Remove
            </button>
                </form>
            </div>


        </div>
    )
}
