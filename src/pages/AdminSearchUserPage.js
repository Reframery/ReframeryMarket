import React, { useEffect, useState } from "react";
import Header from 'components/Header';
import SideBar from "components/AdminSidebar";
import Footer from 'components/Footer'
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "actions/userActions";
import { useNavigate } from "react-router";

export default function UpdateBalancePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //boolean values represents if the search button is clicked or not
    const [searched, setSearched] = useState(false);
    const [searchUserEmail, setSearchUserEmail] = useState('');

    //gets the status of getting the user with the given email
    const userGet = useSelector(state => state.userGet);
    const { error, user } = userGet;

    // handler for the search button
    const searchUserHandler = (e) => {
        e.preventDefault();
        setSearched(true);
        dispatch(getUser(searchUserEmail));
    };

    useEffect(() => {
        // after the admin user clicks the search button, and the given user with the email exists in the system, it will be redirected to search result page
        if (user && searched) {
            navigate(`/admin/search?userEmail=${user.email}`);
        }
    }, [navigate, user, searched]);
    return (
        <div>
            <Header />
            <div className="columns sidebar-content">
                <div className="column is-one-fifth "><SideBar /></div>
                <div className="column is-four-fifths ">
                    <div className="is-centered ml-6 mr-6 mt-6 background-white">
                        <div className="px-6 py-6 is-size-5">
                            <div>
                                <div className=" has-text-weight-bold mb-3">Search a User By Email</div>
                                <div className="columns">
                                    <div className="column is-one-quater">Please Enter the User Email: </div>
                                    <div className="column is-one-half"><input className="input is-small m-r-5" type="email" onChange={(e) => setSearchUserEmail(e.target.value)}></input></div>
                                    <div className="column is-one-quater"><button className="button is-primary is-rounded" onClick={searchUserHandler}> <span>Search</span></button></div>
                                </div>
                                {/* if the user is not valid user, show the error message */}
                                {error ? <div className="danger">! Invalid email address or the user does not exists </div> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
