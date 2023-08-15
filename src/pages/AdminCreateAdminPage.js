import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAdminUser, getUser } from "../actions/userActions";
import Header from 'components/Header';
import SideBar from "components/AdminSidebar";
import Footer from 'components/Footer'
import { useNavigate } from "react-router";

export default function CreateAdminPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //input from user
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [communityName, setCommunityName] = useState('canada');
    const [confirmPassword, setConfirmPassword] = useState('');
    //default attribute for the new created admin 
    const username = "admin";
    const [erroMessage, setErrorMessage] = useState('');
    //variable for the state of button submit
    const [created, setCreated] = useState(false);
    const redirect = '/admin/administrator-management';

    // check if the password contains at least one upper case letter and one lowercase letter and one number
    const isValidPassord = (str) => {
        const reContainUppercase = new RegExp('^.*[A-Z].*$');
        const reContainLowercase = new RegExp('^.*[a-z].*$');
        const reContainNumer = new RegExp('^.*[0-9].*$');
        const reLength = new RegExp('^.{6,}$');
        return reContainUppercase.test(str) && reContainLowercase.test(str) && reContainNumer.test(str) && reLength.test(str)
    }

    // check if the email address is valid
    const isValidEmail = (str) => {
        const reContainSymbol = new RegExp('^.*@.*$');
        return reContainSymbol.test(str)
    }

    // check if the email has been used, if it can get the user with the same email, the error should be false
    const userGet = useSelector(state => state.userGet);
    const { error } = userGet;

    //button handler for create a admin
    const submitHandler = (e) => {
        e.preventDefault();
        setCreated(true);
        if (email === "" || password === "" || confirmPassword === "") {
            setErrorMessage("! Please do not leave empty input");
        }
        else if (!isValidEmail(email)) {
            setErrorMessage("! Invalid email address");
        }
        else if (!isValidPassord(password)) {
            setErrorMessage("! Invalid password");
        }
        else if (password !== confirmPassword) {
            setErrorMessage("! Password and confirm password are different");
        }
        else if (!error) {
            setErrorMessage("! The email address has been used");
        }
        else {
            const confirm = window.confirm("Do you wish to create the account?");
            if (confirm) {
                dispatch(createAdminUser(username, email, password, communityName));
                navigate(redirect);
            }
        }
    };

    useEffect(() => {
        if (created) {
            dispatch(getUser(email));
        }
    }, [dispatch, created]);

    return (
        <div >
            <Header />
            <div className="columns sidebar-content">
                <div className="column is-one-fifth"><SideBar /></div>
                <div className="column is-four-fifths ">
                    <div className="is-centered ml-6 mr-6 mt-6 background-white is-size-5">
                        <div className="is-centered px-6 py-6">
                            <div className="form">
                                <form >

                                    <div className="columns is-centered">
                                        <div className="is-size-4 has-text-weight-bold mb-3">Create New Administrator</div>
                                    </div>
                                    <div className="columns is-centered">
                                        <div className="has-text-danger">{erroMessage}</div>
                                    </div>
                                    <div className="columns is-centered">
                                        <div className="column is-one-quarter">Email Address </div>
                                        <input className="column input is-one-third" type="email" id="email" required onChange={e => setEmail(e.target.value)}></input>
                                    </div>
                                    <div className="columns is-centered">
                                        <div className="column is-one-quarter">Password </div>
                                        <input className="column input is-one-third" type="password" id="password" required onChange={e => setPassword(e.target.value)}></input>
                                    </div>
                                    <div className="columns is-centered">
                                        <div className="column is-one-quarter">Comfirm Password </div>
                                        <input className="column input is-one-third" type="password" id="confirmPassword" required onChange={(e) => setConfirmPassword(e.target.value)}></input>
                                    </div>
                                    <div className="columns is-centered">
                                        <div className="column is-one-quarter">Community  </div>
                                        <div class="column is-one-third">
                                            <div class="select is-primary ">
                                                <select value={communityName} className="select-box" onChange={e => setCommunityName(e.target.value)}>
                                                    <option key="Canada" value="canada">Canada</option>
                                                    <option key="USA" value="usa">USA</option>
                                                    <option key="Brazil" value="brazil">Brazil</option>
                                                    <option key="mexico" value="mexico">Mexico</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="columns is-centered my-6">
                                        <button className="button is-primary is-rounded" onClick={submitHandler}>
                                            <span className="icon">
                                                <i className="fas fa-sign-in-alt"></i>
                                            </span>
                                            <span> Submit  </span>
                                        </button>
                                    </div>




                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
}
