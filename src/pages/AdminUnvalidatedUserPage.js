import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNonMarketUsers, validateUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Header from 'components/Header';
import SideBar from "components/AdminSidebar";
import Footer from 'components/Footer'
import { Link } from "react-router-dom";
import { adminAddCreditToUser, createTransaction } from 'actions/transactionActions';

export default function AwaitingPage() {
    const dispatch = useDispatch();
    //status of signin user
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    //admin user email
    const senderEmail = userInfo.email;
    //admin user community
    const userCommunity = userInfo.marketProfile.communityName;

    //the number of tokens for a new user
    const initalTokens = 25;

    //states of getting the list of unvalidated users
    const unvalidatedUsers = useSelector((state) => state.unvalidatedUsers);
    const { loadingUser, error, unvalidatedList } = unvalidatedUsers;

    //states of validating a user
    const userValidate = useSelector(state => state.userValidate);
    const { user: validatedUser } = userValidate;

    const validationHandler = (id, communityName) => {
        dispatch(validateUser(id, communityName));
    }

    //when validate a user sucessfully, render the page
    useEffect(() => {
        dispatch(getNonMarketUsers());
    }, [dispatch, userCommunity, validatedUser]);
    return (
        <div>
            <Header />
            <div className="columns sidebar-content">
                <div className="column is-one-fifth"><SideBar /></div>
                <div className="column is-four-fifths ">
                    <div className="is-centered ml-6 mr-6 mt-6 background-white is-size-5">
                        <div className="px-6 py-6">
                            {loadingUser ? (
                                <LoadingBox></LoadingBox>
                            ) : error ? (
                                <MessageBox variant="danger">{error}</MessageBox>
                            ) : (

                                <div >
                                    <div className="columns has-text-weight-bold has-text-centered">
                                        <div className="column is-one-third"> Email</div>
                                        <div className="column"> &nbsp;</div>
                                    </div>
                                    {
                                        unvalidatedList.map((currentUser) => (
                                            <div key={currentUser.email} className="columns has-text-centered">
                                                <div className="column is-one-third">{currentUser.email}</div>
                                                {/* <div className="column"><button className="button is-primary is-rounded" onClick={()=>{validationHandler(currentUser.id)}}>Validate</button></div> */}
                                                <div className="add-dropdown">
                                                    <div className="column"><button className="button is-primary is-rounded" >Add</button></div>
                                                        <ul className="add-dropdown-content" >
                                                            <button onClick={()=>{validationHandler(currentUser.id, "canada")}}>Canada</button>
                                                            <button onClick={()=>{validationHandler(currentUser.id, "usa")}}>USA</button>
                                                            <button onClick={()=>{validationHandler(currentUser.id, "brazil")}}>Brazil</button>
                                                            <button onClick={()=>{validationHandler(currentUser.id, "mexico")}}>Mexico</button>
                                                        </ul>
                                                </div>
                                            </div>))
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
}
