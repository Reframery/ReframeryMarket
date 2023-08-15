import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from 'components/Header';
import SideBar from "components/SideBar";
import Footer from 'components/Footer'
import LoadingBox from "components/LoadingBox";
import MessageBox from "components/MessageBox";
import { searchItems } from "actions/searchActions";
import Item from "components/Item";

export default function SearchResultpage() {
    const search = useLocation().search;
    const community = new URLSearchParams(search).get('community');
    const category = new URLSearchParams(search).get('category');
    const subCategory = new URLSearchParams(search).get('subCategory');
    const searchKey = new URLSearchParams(search).get('item');
    const page = new URLSearchParams(search).get('page');
    const limit = new URLSearchParams(search).get('limit');
    const [pageNumber, setPageNumber] = useState(1);

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch();
    const itemsSearch = useSelector((state) => state.itemsSearch);
    const { loading, error, items } = itemsSearch;


    const decreaseHandler = (e) => {
        setPageNumber(pageNumber - 1)
    }

    const increaseHandler = (e) => {
        setPageNumber(pageNumber + 1)
    }

    // send the request to the backend
    useEffect(() => {
        dispatch(searchItems(searchKey, category, subCategory, limit, page, community));
    }, [dispatch, searchKey, category, subCategory, limit, page, community]);

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
                                Search Result:
                            </div>
                            {items ? (
                                items.length > 0 ? <div>
                                    <div className="list-products" >
                                        <div className="itemlist-container" >
                                            <div className="list-items">
                                                {items.map((item) => (
                                                    <Item key={item.id} item={item} community={community}></Item>
                                                ))}

                                            </div>
                                        </div>

                                    </div>
                                    <div className="page-number" >
                                        &lt; {pageNumber} &gt;
                                            </div>
                                    <div className="page-button" >
                                        <div className="button-container">
                                            <div className="button1">
                                                {pageNumber > 1 ? <Link to={"/search?community=" + community + "&category=" + category + "&subCategory=" + subCategory + "&item=" + searchKey + "&page=" + page + "&limit=" + limit} className="link">
                                                    <button className="button is-primary" onClick={decreaseHandler}>
                                                        <span> Previous Page  </span>
                                                    </button>
                                                </Link> : <div></div>}
                                            </div>
                                            <div className="button2">
                                                {pageNumber > 0 && items.length > limit - 1 ? <Link to={"/search?community=" + community + "&category=" + category + "&subCategory=" + subCategory + "&item=" + searchKey + "&page=" + page + "&limit=" + limit} className="link">
                                                    <button className="button is-primary" onClick={increaseHandler}>
                                                        <span> Next Page  </span>
                                                    </button>
                                                </Link> : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    : <div className="has-text-centered is-size-4">Items Not Found</div>
                            ) :
                                <div  className="has-text-centered is-size-4">Items Not Found</div>}
                        </section>
                    </div>
                    <Footer />
                </div>

            )}
        </div>
    );
}
