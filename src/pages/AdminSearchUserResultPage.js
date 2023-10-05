import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByEmail } from "../actions/userActions";
import Header from 'components/Header';
import SideBar from "components/AdminSidebar";
import Footer from 'components/Footer'
import LoadingBox from "components/LoadingBox";
import MessageBox from "components/MessageBox";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function UpdateBalancePage() {
    const dispatch = useDispatch();
    const search = useLocation().search;
    //get the user email address fro the search path
    const userEmail = new URLSearchParams(search).get('userEmail');
    //number of tokens that the adimin user want to send to the user
    const [creditUnit, setCreditUnit] = useState(0);

    // //get the admin user information
    // const userSignin = useSelector(state => state.userSignin);
    // const { userInfo } = userSignin;
    
    //status of getting the user object
    const userGet = useSelector(state => state.userGet);
    const { loading, error, user } = userGet;

    //status of updating a user object
    const userUpdate = useSelector(state => state.userUpdate);
    const { user: updatedUser } = userUpdate;


    //button handler for add balance
    const addCreditHandler = (e) => {
        e.preventDefault();
            if (creditUnit > 0 && creditUnit < 1000) {
                const confirm = window.confirm("Do you wish to send " + creditUnit + " tokens to " + user.email + "?");
                if (confirm) {
                    //todo
                }
            } else {
                alert("The number should be greater than 0 and less than 1000!");
            }
        
    };

    useEffect(() => {
        dispatch(getUserByEmail(userEmail));
    }, [dispatch, userEmail, updatedUser]);
    return (
        <div >
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div>
                    <Header />
                    <div className="columns sidebar-content">
                        <div className="column is-one-fifth"><SideBar /></div>
                        <div className="column is-four-fifths">
                            <div className="mx-6 my-6 background-white">
                                <div className=" px-6 py-6 is-size-5">
                                        <div className="">
                                            <div>
                                                <div className="is-size-5 has-text-weight-bold"> User Details</div>

                                                <div className="columns">
                                                    <div className="column is-one-third">Email</div>
                                                    <div className="column">{user.email}</div>
                                                </div>
                                                <div className="columns">
                                                    <div className="column is-one-third">Currency Balance</div>
                                                    <div className="column">{user.currentCredit}</div>
                                                </div>
                                                <div className="is-size-5 has-text-weight-bold"> Update user's Balance</div>
                                                <div className="columns">
                                                    <div className="column is-one-third">Unit of Currency</div>
                                                    <div className="columns">
                                                        <div className="column is-one-quater"><input type="number" onChange={(e) => setCreditUnit(e.target.value)}></input></div>
                                                        <div className="column is-one-quater"><button className="button is-primary is-rounded" onClick={addCreditHandler}> Add</button></div>
                                                    </div>

                                                </div>


                                            </div>

                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>)}
        </div>
    );
}
