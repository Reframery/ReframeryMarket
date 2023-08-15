import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { banUser, getUser, unBanUser } from "../actions/userActions";
import Header from 'components/Header';
import SideBar from "components/AdminSidebar";
import Footer from 'components/Footer'
import { adminAddCreditToUser, createTransaction } from "actions/transactionActions";
import LoadingBox from "components/LoadingBox";
import MessageBox from "components/MessageBox";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Web3 from 'web3'
import ABI from "ABI.json"

export default function UpdateBalancePage() {
    const dispatch = useDispatch();
    const search = useLocation().search;
    //get the user email address fro the search path
    const userEmail = new URLSearchParams(search).get('userEmail');
    //admin user public wallet address of MetaMask 
    // const senderAddress= userInfo.walletAddress;
    const senderAddress = '0xCE8A653959eA79d5ED32763aD6e22f1ed025776a'
    //the active account of MetaMask
    const [activeAddress, setactiveAddress] = useState('');
    //number of tokens that the adimin user want to send to the user
    const [creditUnit, setCreditUnit] = useState(0);

    //get the admin user information
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const senderEmail = userInfo.email;

    //status of getting the user object
    const userGet = useSelector(state => state.userGet);
    const { loading, error, user } = userGet;

    //status of updating a user object
    const userUpdate = useSelector(state => state.userUpdate);
    const { user: updatedUser } = userUpdate;

    // status of adding credit to a user
    const creditAdd = useSelector(state => state.creditAdd);
    const { transaction: transactionAdd } = creditAdd;

    // create an instance of the smart contract of DNAC Tokens
    const web3 = new Web3(Web3.givenProvider);
    const [abi] = useState(ABI.ABI);
    const contractAddress = '0x45BcC95Ca4EEC94755EB0B4B330D48D70D4a5142';
    const myContract = new web3.eth.Contract(abi, contractAddress);
    window.addEventListener('load', function () {
        // Check if Web3 has been injected by the browser (MetaMask).
        if (window.ethereum) {
            console.log('metamask has been installed');
        } else {
            //Handle the case where the user doesn't have web3, 
            // show them a message telling them to install Metamask in 
            // order to validate the user.
            window.alert('Please install MetaMask!');
            return;
        }
    });
    // set address of active account
    if (window.ethereum) {
        try {
            // set the active account address
            web3.eth.getCoinbase().then(coinbase => {
                setactiveAddress(coinbase);
            })
        } catch (error) {
            console.error(error);
        }
        // listen to account changes and set the changed account the variable activeAddress
        window.ethereum.on('accountsChanged', function (accounts) {
            setactiveAddress(accounts[0])
        });
    }

    //button handler for add balance
    const addCreditHandler = (e) => {
        e.preventDefault();
        //check if the admin user access the metamsk
        if (!activeAddress) {
            const AccessMetamaskConfirm = window.confirm("Do you wish to access via MetaMask ?");
            if (AccessMetamaskConfirm) {
                // Request account access
                window.ethereum.request({ method: 'eth_requestAccounts' });
                return;
            }
        } else {
            if (creditUnit > 0 && creditUnit < 1000) {
                const confirm = window.confirm("Do you wish to send " + creditUnit + " tokens to " + user.email + "?");
                if (confirm) {
                    //check if the active address matches the address in the admin user account
                    if (activeAddress.toLowerCase() !== senderAddress.toLowerCase()) {
                        window.alert('You should active the matched account with your reframery account.');
                        return;
                    } else {
                        //if the active MetaMask address mathces the address in the admin user account
                        //change the receriver account status
                        //send the transaction request to the contract with the parameters and get the returned transaction hash number
                        //and update user status in database
                        myContract.methods.transfer(user.walletAddress, (creditUnit * Math.pow(10, 18)).toString()).send({ from: senderAddress }, async function (error, transactonHash) {
                            if (!error) {
                                console.log("Submitted transaction with hash: ", transactonHash)
                                dispatch(adminAddCreditToUser(senderEmail, user.email, creditUnit));
                                dispatch(createTransaction(senderEmail, userEmail, creditUnit, transactonHash));
                            } else {
                                console.error(error.message);
                            }
                        });
                    }
                }
            } else {
                alert("The number should be greater than 0 and less than 1000!");
            }
        }
    };

    //button handler for locking the user
    const banUserHandler = (e) => {
        e.preventDefault();
        const confirm = window.confirm("Do you wish to lock " + user.email + "?");
        if (confirm) {
            dispatch(banUser(user.email, true));
        }
    };
    //button handler for unlocking the user
    const unBanUserHandler = (e) => {
        e.preventDefault();
        const confirm = window.confirm("Do you wish to unlock " + user.email + "?");
        if (confirm) {
            dispatch(unBanUser(user.email, false));
        }
    };

    useEffect(() => {
        dispatch(getUser(userEmail));
    }, [dispatch, userEmail, updatedUser, transactionAdd]);
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
                                    {/* check if the user's validation status, if the user has been validated, 
                                show the user detail information, else show the admin that the user has not been validate and provide the link to validation*/}
                                    {user.validateStatus ?
                                        (<div className="">
                                            <div>
                                                <div className="is-size-5 has-text-weight-bold"> User Details</div>

                                                <div class="columns">
                                                    <div class="column is-one-third">Email</div>
                                                    <div class="column">{user.email}</div>
                                                </div>
                                                <div class="columns">
                                                    <div class="column is-one-third">MetaMask Address</div>
                                                    <div class="column">{user.walletAddress}</div>
                                                </div>
                                                <div class="columns">
                                                    <div class="column is-one-third">Currency Balance</div>
                                                    <div class="column">{user.currentCredit}</div>
                                                </div>
                                                <div class="columns">
                                                    <div class="column is-one-third">Status</div>
                                                    <div class="column">{user.banned ? "banned" : "unbanned"}</div>
                                                </div>
                                                <div class="columns">
                                                    <div class="column is-one-third">Lock/Unlock</div>
                                                    <div class="column"><button className="button is-primary is-rounded" onClick={banUserHandler}>Ban </button>
                                                        <button className="button is-primary is-rounded" onClick={unBanUserHandler}>Unban</button></div>
                                                </div>
                                                <div className="is-size-5 has-text-weight-bold"> Update user's Balance</div>
                                                <div class="columns">
                                                    <div class="column is-one-third">Unit of Currency</div>
                                                    <div class="columns">
                                                        <div class="column is-one-quater"><input type="number" onChange={(e) => setCreditUnit(e.target.value)}></input></div>
                                                        <div class="column is-one-quater"><button className="button is-primary is-rounded" onClick={addCreditHandler}> Add</button></div>
                                                    </div>

                                                </div>


                                            </div>

                                        </div>
                                        ) : (
                                            <div>
                                                <div>{user.email} has not been validated!</div>
                                                <div><Link className="link" to="/admin/awaiting-validation">Please validate the user!</Link></div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>)}
        </div>
    );
}
