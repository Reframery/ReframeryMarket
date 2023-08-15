import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUnvalidatedUsers, validateUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Header from 'components/Header';
import SideBar from "components/AdminSidebar";
import Footer from 'components/Footer'
import { adminAddCreditToUser, createTransaction } from 'actions/transactionActions';
import Web3 from 'web3';
import ABI from "ABI.json"

export default function AwaitingPage() {
    const dispatch = useDispatch();
    //status of signin user
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    //admin user email
    const senderEmail = userInfo.email;
    //admin user community
    const userCommunity = userInfo.communityName;
    //admin user public wallet address of MetaMask 
    // const senderAddress= userInfo.walletAddress;
    const senderAddress = '0xCE8A653959eA79d5ED32763aD6e22f1ed025776a'
    //the number of tokens for a new user
    const initalTokens = 25;
    //the active account of MetaMask
    const [activeAddress, setactiveAddress] = useState('');

    //states of getting the list of unvalidated users
    const unvalidatedUsers = useSelector((state) => state.unvalidatedUsers);
    const { loadingUser, error, unvalidatedList } = unvalidatedUsers;

    //states of validating a user
    const userValidate = useSelector(state => state.userValidate);
    const { user: validatedUser } = userValidate;

    // create an instance of the smart contract of DNAC Tokens
    var web3 = new Web3(Web3.givenProvider);
    const [abi] = useState(ABI.ABI);
    const contractAddress = '0x45BcC95Ca4EEC94755EB0B4B330D48D70D4a5142';
    const myContract = new web3.eth.Contract(abi, contractAddress);

    // Check if Web3 has been injected by the browser (MetaMask).
    window.addEventListener('load', function () {
        //if the metamask has been installed, 
        if (window.ethereum) {
            console.log('metamask has been installed');
        } else {
            //Handle the case where the user doesn't have web3, 
            // show them a message telling them to install Metamask in 
            // order to validate the user.
            window.alert('Please install MetaMask!');
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

    //hanlder for the validate button  
    const validateHandler = (e) => {
        //receiver email and recever account address
        var [receiverEmail, receiverAddress] = e.target.value.split(',');
        // web3.eth.getCoinbase().then(coinbase => {
        //     setactiveAddress(coinbase);                   
        // })
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
            const confirm = window.confirm("Do you wish to validate " + receiverEmail + " ?");
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
                    myContract.methods.transfer(receiverAddress, (25 * Math.pow(10, 18)).toString()).send({ from: senderAddress }, async function (error, transactonHash) {
                        if (!error) {
                            console.log("Submitted transaction with hash: ", transactonHash)
                            dispatch(validateUser(receiverEmail));
                            dispatch(adminAddCreditToUser(senderEmail, receiverEmail, initalTokens));
                            dispatch(createTransaction(senderEmail, receiverEmail, initalTokens, transactonHash));
                        } else {
                            console.error(error.message);
                        }
                    });
                }
            }
        }
    };

    //when validate a user sucessfully, render the page
    useEffect(() => {
        dispatch(searchUnvalidatedUsers(userCommunity));
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
                                        <div className="column"> User Name</div>
                                        <div className="column is-one-third"> Email</div>
                                        <div className="column"> Request Time </div>
                                        <div className="column"> Status</div>
                                        <div className="column"> &nbsp;</div>
                                    </div>
                                    {
                                        unvalidatedList.map((currentUser) => (currentUser.validateStatus === false
                                            && currentUser.admin === false &&
                                            <div key={currentUser.email} className="columns has-text-centered">
                                                <div className="column"> {currentUser.username}  </div>
                                                <div className="column is-one-third">{currentUser.email}</div>
                                                <div className="column">{currentUser.registerTime.slice(0, 10)} </div>
                                                <div className="column">pending</div>
                                                <div className="column"><button className="button is-primary is-rounded" value={[currentUser.email, '0x46c68aDc15CeeB1C06d34fD38f574029a7035a08']} onClick={validateHandler}>Validate</button></div>
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
