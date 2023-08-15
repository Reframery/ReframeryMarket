import React, { useEffect, useState } from "react";
import ListItem from "../components/ListItem";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from 'components/Header';
import SideBar from "components/SideBar";
import Footer from 'components/Footer'
import { getItemsOfCategory } from "actions/itemActions";
import LoadingBox from "components/LoadingBox";
import MessageBox from "components/MessageBox";


export default function MoreItemspage() {
    const dispatch = useDispatch();
    const { community, category, startingFrom } = useParams();
    const limit = 30;
    const reversed = true;
    const [pageNumber, setPageNumber] = useState(1);

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    
    const itemsOfCategoryGet = useSelector((state) => state.itemsOfCategoryGet);
    const { loading, error, items } = itemsOfCategoryGet;

    // handler for previous page
    const decreaseHandler = (e) => {
        setPageNumber(pageNumber - 1)
    }
    // handler for next page
    const increaseHandler = (e) => {
        setPageNumber(pageNumber + 1)
    }

    // send the request to the backend
    useEffect(() => {
        dispatch(getItemsOfCategory(category, limit, startingFrom, reversed, community));
    }, [dispatch, startingFrom, category, limit, reversed, community]);

    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (

                <div className="home-container">
                    <div className="header">
                        <Header community={community} cartNum={0} />
                    </div>
                    <div className="sidebar-content">
                        {userInfo ? (userInfo.admin ? null : <SideBar />) : null}

                        <section className="container">
                            <div className="moreItems-category">
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </div>
                            <div className={"list-" + category} >
                                {items.length > 0 ?
                                    <ListItem community={community} mainCategory={category} itemList={items} />
                                    : <div className="has-text-centered py-4">Items Not Found</div>}
                            </div>
                            <div className="page-number" >
                                &lt; {pageNumber} &gt;
                                        </div>
                            <div className="page-button" >
                                <div className="button-container">
                                    <div className="button1">
                                        {pageNumber > 1 ? <Link to={"/" + community + "/" + category + "/" + startingFrom + "/" + limit} className="link">
                                            <button className="button is-primary" onClick={decreaseHandler}>
                                                <span> Previous Page  </span>
                                            </button>
                                        </Link> : <div></div>}
                                    </div>
                                    <div className="button2">
                                        {pageNumber > 0 && items.length > limit - 1 ? <Link to={"/" + community + "/" + category + "/" + startingFrom + "/" + limit} className="link">
                                            <button className="button is-primary" onClick={increaseHandler}>
                                                <span> Next Page  </span>
                                            </button>
                                        </Link> : null}
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                    <Footer />
                </div>

            )}
        </div>
    );
}
