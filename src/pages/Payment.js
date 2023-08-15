import Footer from "components/Footer";
import Navbar from "components/Navbar";
import Sidebar from "components/SideBar";
import React from "react";
import Header from "components/Header";
import NewSidebar from "components//SideBar";

class Payment extends React.Component {
    render (){
        return (
            <div>
                <Header />
                <div className="container payment-container">
                    <div className="columns">
                        <div className="column is-one-quarter">
                            <NewSidebar />
                        </div>

                        <div className="column is-half">
                            <h1 className="title is-1">Payment Confirmation</h1>
                            <progress class="progress" value="100" max="100">100%</progress>

                            <div className="panel is-info">
                                <p className="panel-heading">
                                    Transaction Details
                                </p>

                                <div className="panel-body">
                                    <dl className="dl-horizontal">
                                        <dt>Transaction ID</dt>
                                        <dd>gsyd6h2smmxd7dujs</dd>
                                        <dt>Submission Time</dt>
                                        <dd>14:37:25, Jan 11, 2021</dd>
                                        <dt>Sender Name</dt>
                                        <dd>Michael Lee</dd>
                                        <dt>Sender ID</dt>
                                        <dd>refra2@mcmaster.ca</dd>
                                        <dt>Receiver Name</dt>
                                        <dd>Ref Admin</dd>
                                        <dt>Receiver ID</dt>
                                        <dd>refra3@mcmaster.ca</dd>
                                        <dt>Reason</dt>
                                        <dd>Purchase on marketplace</dd>
                                        <dt>Purchase ID</dt>
                                        <dd>nxwja7727hsnxgd</dd>
                                    </dl>
                                </div>
                            </div>

                            <h1 className="title">Quick Access:</h1>
                            <div className="buttons is-centered">
                                <button className="button is-primary">Continue Shopping</button>
                                <button className="button">Purchase History</button>
                                <button className="button">Sales History</button>
                                <button className="button">My Wallet</button>
                                <button className="button">Transaction History</button>
                                <button className="button">My Profile</button>
                            </div>
                        </div>

                        <div className="column is-one-quarter">
                            <h1 className="title">Rate your experience</h1>
                            <h1 className="subtitle">We are happy to hear from you</h1>

                            <div className="field">
                                Question 1:
                                <div className="control">
                                    <label className="radio">
                                        <input type="radio" name="answer" />
                                        1
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" />
                                        2
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" />
                                        3
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" />
                                        4
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" />
                                        5
                                    </label>
                                </div>
                            </div>


                            <div className="field">
                                Question 2:
                                <div className="control">
                                    <label className="radio">
                                        <input type="radio" name="answer" />
                                        1
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" />
                                        2
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" />
                                        3
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" />
                                        4
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" />
                                        5
                                    </label>
                                </div>
                            </div>


                            <div className="field">
                                Question 3:
                                <div className="control">
                                    <label className="radio">
                                        <input type="radio" name="answer" />
                                        1
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" />
                                        2
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" />
                                        3
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" />
                                        4
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" />
                                        5
                                    </label>
                                </div>
                            </div>


                            <div className="field">
                                Question 4:
                                <div className="control">
                                    <label className="radio">
                                        <input type="radio" name="answer" />
                                        1
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" />
                                        2
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" />
                                        3
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" />
                                        4
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" />
                                        5
                                    </label>
                                </div>
                            </div>


                            <div className="field">
                                Question 5:
                                <div className="control">
                                    <label className="radio">
                                        <input type="radio" name="answer" />
                                        1
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" />
                                        2
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" />
                                        3
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" />
                                        4
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" />
                                        5
                                    </label>
                                </div>
                            </div>

                            <div class="field">
                                <label className="label">We value your feedback:</label>
                                <div class="control">
                                    <textarea class="textarea is-primary" placeholder="please leave any comments related to the purchase expericence"></textarea>
                                </div>
                            </div>

                            <div class="control has-text-centered">
                                <button class="button is-link">Submit</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Payment;