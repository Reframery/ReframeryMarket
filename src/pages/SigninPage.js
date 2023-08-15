import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signin } from "actions/userActions";
import WellcomeComponent from "components/WellcomeComponent";
import Footer from 'components/Footer'

export default function Signin(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userSignin = useSelector(state => state.userSignin);
  const { error, userInfo } = userSignin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    // if the user sign in sucessfully, go to the redirect link
    if (userInfo) {
      // props.history.push(redirect);
      if (userInfo.admin || userInfo.manager) {
        navigate('/admin');
      } else {
        navigate(`/${userInfo.communityName}`);
      }
    }
  }, [navigate, userInfo]);

  return (
    <div>
      <div className="wellcome-container">
        <WellcomeComponent />
        <div className="form" >
          <form className="signin" >
            <div>
              <h3 className="signin-text">Sign In</h3>
              {error ? <div className="danger">! Invalid email or password</div> : null}
            </div>
            <div>
              <label >Email </label>
              <input type="email" id="email" value={email} required onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label >Password </label>
              <input type="password" id="password" value={password} required onChange={e => setPassword(e.target.value)} />
            </div>
            {/* <div className="admin-checkbox">
              <input className="box" type="checkbox" />Sign in as admin
            </div> */}
            <div className="submit-button">
              <button className="button is-primary is-rounded" onClick={submitHandler}>
                <span className="icon">
                  <i className="fas fa-sign-in-alt"></i>
                </span>
                <span> Submit  </span>
              </button>
            </div>
            <div className="message">
              Don't have account? <Link to="/register" className="linkto">&nbsp;Register</Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

