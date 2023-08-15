import React from "react";
import Header from 'components/Header';
import SideBar from "components/SideBar";
import Footer from 'components/Footer'
import { useSelector } from "react-redux";


export default function ContactPage() {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    return (
        <div>
            <Header />
            <div className="info-page">
            {userInfo ? (userInfo.admin ? null : <SideBar />) : null}
                <div className="container">
                <h2>This is contact page</h2>
                <h2>Waiting for update from Reframery team...</h2>

                 </div>
            </div>
            <Footer />
        </div>
    );
}
