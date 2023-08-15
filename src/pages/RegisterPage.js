import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { createUser, getUser } from "../actions/userActions";
import { createCart } from "../actions/cartActions";
import WellcomeComponent from "../components/WellcomeComponent";
import Footer from 'components/Footer'

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [communityName, setCommunityName] = useState('canada');
    const [confirmPassword, setConfirmPassword] = useState('');
    const redirect = '/signin';
    const [erroMessage, setErrorMessage] = useState('');

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

    const submitHandler = (e) => {
        e.preventDefault();
        if (username === "" || email === "" || password === "" || confirmPassword === "") {
            setErrorMessage("! Enter your information");
        }
        else if (!isValidEmail(email)) {
            setErrorMessage("! Invalid email address");
        }
        else if (!isValidPassord(password)) {
            setErrorMessage("! Invalid password");
        }
        else if (password !== confirmPassword) {
            setErrorMessage("! Passwords do not match");
        }
        else if (!error) {
            setErrorMessage("! E-mail address already in use");
        }
        else {
            const confirm = window.confirm("Do you wish to create the account?");
            if (confirm) {
                //create a new user record
                dispatch(createUser(username, email, password, communityName));
                //create a shopping cart for the user
                dispatch(createCart(email, "default cart"));
                navigate(redirect);
            }
        }
    };

    useEffect(() => {
        dispatch(getUser(email));
    }, [dispatch, email]);

    return (
        <div>
            <div className="wellcome-container">
                <WellcomeComponent />
                <div className="form">
                    <form className="Register">
                        <div>
                            <h3>Create New Account</h3>
                            <label className="danger">{erroMessage}</label>
                        </div>
                        <div>
                            <label >User Name </label>
                            <input type="text" id="username" value={username} required onChange={(e) => setUsername(e.target.value)}></input>
                            {username.length > 15 ? 
                                <div class="notification is-danger is-light mt-0 pt-0 pb-0">
                                    user name is too long
                                </div> : null}
                        </div>
                        <div>
                            <label >Email Address </label>
                            <input type="email" id="email" value={email} required onChange={e => setEmail(e.target.value)}></input>
                        </div>
                        <div>
                            <label >Password </label>
                            <input type="password" id="password" value={password} required onChange={e => setPassword(e.target.value)}></input>
                            <div className="password-warning"> <i className="far fa-bell"></i> At least 6 characters and contains at least one uppercase, one lowercase and a number</div>

                        </div>
                        <div>
                            <label >Comfirm Password </label>
                            <input type="password" id="confirmPassword" value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)}></input>
                        </div>
                        <div>
                            <label >Community  </label>
                            <select value={communityName} className="select-box" onChange={e => setCommunityName(e.target.value)}>
                                <option key="canada" value="canada">Canada</option>
                                <option key="usa" value="usa">USA</option>
                                <option key="brazil" value="brazil">Brazil</option>
                                <option key="mexico" value="mexico">Mexico</option>
                            </select>
                        </div>

                        <div className="terms">By continuing, you agree to Reframery's <Link to="/terms-and-conditions" className="link">Term and Condition</Link> and <Link to="/privacy-policy" className="link">Privacy Policy</Link>.</div>

                        <div className="submit-button">
                            <button className="button is-primary is-rounded" onClick={submitHandler}>
                                <span className="icon">
                                    <i className="fas fa-sign-in-alt"></i>
                                </span>
                                <span> Submit  </span>
                            </button>
                        </div>
                        <div className="message">Already have account?
                    <Link to="/signin" className="link">&nbsp;Sign in</Link>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}