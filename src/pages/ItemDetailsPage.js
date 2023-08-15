import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import Rating from '../components/Rating';
import { Link } from "react-router-dom";
import Header from 'components/Header';
import SideBar from "components/SideBar";
import Footer from 'components/Footer'
import { useDispatch, useSelector } from 'react-redux';
import { getItem } from 'actions/itemActions';
import LoadingBox from 'components/LoadingBox';
import MessageBox from 'components/MessageBox';


export default function ItemDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();

    // get sign-in user info
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;  
    
    // get item details
    const itemGet = useSelector((state) => state.itemGet);
    const { loading, error, item } = itemGet;



    const addToCartHandler = () => {
        // check the number of shopping carts owned by the current user

    }

    // send the request to the backend
    useEffect(() => {          
        dispatch(getItem(id));
    }, [dispatch, id]);

    return (

        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                        <div>
                            <Header />

                            <div className="sidebar-content">
                                {userInfo ? <SideBar /> : null}
                                <div className="container">
                                    <div className="item-page">
                                        <div className="details">
                                            <div className="details-c1">
                                                <div>
                                                    <h1>{item.name}</h1>
                                                </div>
                                                <div className="details-image">
                                                    <img src={item.imageURL} alt="product"></img>
                                                </div>
                                                <div className="details-buttons">
                                                    <div>
                                                        <button className="button-addToCart" onClick={addToCartHandler}><Link to="/cart"><h3>Add to Cart</h3></Link></button>
                                                    </div>
                                                </div>
                                                <div className="details-buttons">
                                                    <button className="button-addToCart" onClick={addToCartHandler}><Link to="/payment"><h3>Buy Item</h3></Link></button>
                                                </div>
                                                <div>
                                                    <Link to="/"><h3 className="back-to-mar">Back to marketplace</h3></Link>
                                                </div>
                                            </div>

                                            <div className="details-information">
                                                <div>
                                                    <div className="details-title">
                                                        <h1>Item Details</h1>
                                                    </div>
                                                    <ul>
                                                        <li >Rating:<Rating rating={item.averageRating} numOfReviews={item.numberOfFeedbacks}></Rating></li>
                                                        <li> Price: ${item.price}</li>
                                                        <li> Address: <span>{item.city}, {item.province}</span></li>
                                                        <li>
                                                            <div className="row">
                                                                <div>Status:</div>
                                                                <div>{item.stock > 0 ? (<span className="sucess">In Stock</span>) :
                                                                    (<span className="danger">Out of Stock</span>)}
                                                                </div>
                                                            </div>
                                                        </li>

                                                        <li className="details-description">Description: <p className="details-description-content">{item.description}</p></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Footer />
                        </div>
                    )}
        </div>
    );
}

