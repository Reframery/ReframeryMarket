import SideBar from 'components/SideBar';
import React from 'react';
import  { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router";
import { getUser } from "../actions/userActions";
import AdminSideBar from "components/AdminSidebar";
import Footer from "components/Footer";
import Header from "components/Header";
import { useParams } from "react-router-dom";


// import 'react-phone-number-input/style.css'
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";


export default function PurchaseHistory() {
    const dispatch = useDispatch();
    // get sign in user token
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const { community } = useParams();
    
    // get sign in user detail informaton
    const userGet = useSelector(state => state.userGet);
    const { loading, error, user } = userGet;

    useEffect(() => {
        dispatch(getUser(userInfo.email));
      }, [dispatch, userInfo]);
    
    return (
        <div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
                <div className="container history-container">
                    <div className="header">
                        <Header community={community}/>
                    </div>

                    <div className="columns">
                        <div className="column is-one-quarter">
                            {userInfo.admin? <AdminSideBar /> : <SideBar/>} 
                        </div>

                        <div className="column　is-three-quarters history-body">
                            <div className="history-title mt-6">
                                <h1 className="title is-1">Sales History</h1>
                            </div>

                            <div className="history-records">
                                <div className="columns is-vcenteres">
                                    <div className="column is-narrow">
                                        happy
                                    </div>

                                    <div className="column">
                                        happy
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
        )}
        <Footer />
        </div>
    )
}
