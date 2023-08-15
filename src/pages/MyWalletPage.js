import React, { useEffect } from "react";
import Header from 'components/Header';
import SideBar from "components/SideBar";
import Footer from 'components/Footer';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { getUser } from 'actions/userActions';
import { getTransactionsOfUser } from 'actions/transactionActions';
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function Currency() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const userSignin = useSelector(state => state.userSignin);
    useEffect(() => {          
        dispatch(getUser(id));
    }, [dispatch, id]);
    const { userInfo,loading, error } = userSignin;
    return (
        <div>{loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <div className="content content-margined">
                <div className="order-header">
                        <h3>Your current balance</h3> 
                </div>
                <div className="currency-box">
                    <h1>${userInfo.currentCredit}</h1>
                </div>
            </div>)}
        </div> 
    );
}

function TransactionHistory() {
    const dispatch = useDispatch(); 
    
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    
    const transactionsOfUserGet = useSelector(state => state.transactionsOfUserGet);
    const { transactions, loading, error } = transactionsOfUserGet;
    //console.log(userInfo.email);
    useEffect(() => {          
        dispatch(getTransactionsOfUser(userInfo.email,20,0,false));
        // console.log(userInfo.email);
        //console.log(transactions.map((transaction) => transaction.senderEmail));
    }, [dispatch, userInfo.email]);
    return (
        <div>{loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <div className="content content-margined">
                <div className="order-header">
                    <h3>Transaction History</h3> 
                </div>
                {/* <div>{transactions.map((transaction) => transaction.senderEmail)}</div>  */}
                <div className="order-list">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>FROM</th>
                                <th>TO</th>
                                <th>DATE</th>
                                <th>CREDIT UNIT</th>
                            </tr>
                        </thead>    
                        <tbody>
                            {transactions && transactions.length > 0 ? transactions.map(transaction => (<tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.senderEmail}</td>
                                <td>{transaction.receiverEmail}</td>
                                <td>{transaction.createdTime.toString().substring(0,10)}</td>
                                <td>${transaction.creditUnit}</td>
                            </tr>)): null}
                        </tbody>
                    </table>
                </div>
            </div>)}
        </div>
        
        //   {<div className="transaction">
        //      {transactions.map((transaction) => (<div key={transaction.id}>
        //               <div className="trans-text">
        //                   <div>
        //                       <div>Transaction ID: {transaction.id}</div>
        //                       <div>From: {transaction.senderEmail}</div>
        //                       <div>To: {transaction.receiverEmail}</div>
        //                       <div>Date: {transaction.createdTime}</div>
        //                       <div>Credit Unit: ${transaction.creditUnit}</div>
        //                   </div>
        //               </div>
        //       </div>))}
        //   </div>
        //      </div>)}</div> }


    );
}

function Main() {
    return (
        <div>
            <Header />
            <div className="sidebar-content">
                <SideBar />
                <div className="wallet-container">
                    <div className="wallet">
                        
                            <div className="wallet-c1">
                                <Currency />
                            </div>
                            <div className="wallet-c2">
                                <TransactionHistory />
                            </div>
                        
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Main;