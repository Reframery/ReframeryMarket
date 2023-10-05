import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router";
import { getUser, updateUserAddress } from "../actions/userActions";
import Header from 'components/Header';
import SideBar from "components/SideBar";
import AdminSideBar from "components/AdminSidebar";
import Footer from 'components/Footer'
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Link } from "react-router-dom";

export default function UpdateUserAddressPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // get sign in user token
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  // get sign in user detail informaton
  const userGet = useSelector(state => state.userGet);
  const { loading, error, user } = userGet;

  // constant for updating address
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postcode, setPostcode] = useState('');
  const [country, setCountry] = useState('');
  const [erroMessage, setErrorMessage] = useState('');


  // check if the email address is valid
  const isValidAddress = (str) => {
    const reAdress = new RegExp('^[A-Za-z0-9 ]*$');
    return reAdress.test(str)
  }

  // check if the city is valid
  const isValidCityAndCountry = (str) => {
    const reCityAndCountry = new RegExp('^[A-Za-z ]*$');
    return reCityAndCountry.test(str)
  }

  // check if the postcode is valid
  const isValidPoscode = (str) => {
    const rePostcode = new RegExp('^[A-Z0-9 ]{6,}$');
    return rePostcode.test(str)
  }

  // function for updating user address
  const updateHandler = (e) => {
    e.preventDefault();
    if (address === "" || city === "" || province === "" || country === "" || postcode === "") {
      setErrorMessage("! empty imput");
    } else if (!isValidAddress(address)) {
      setErrorMessage("! invalid address");
    }
    else if (!isValidCityAndCountry(city)) {
      setErrorMessage("! invalid city anme");
    }
    else if (!isValidCityAndCountry(province)) {
      setErrorMessage("! invalid province name");
    }
    else if (!isValidPoscode(postcode)) {
      setErrorMessage("! invalid postcode");
    } else if (!isValidCityAndCountry(country)) {
      setErrorMessage("! invalid country name");
    }
    else {
      const confirm = window.confirm("Are you sure to update your personal information?");
      if (confirm) {
        //if the input value for the field is empty, keep the original value of the field
        // dispatch(updateUserAddress(userInfo.email, address, city, province, country, postcode));
        navigate('/my-profile');
      }
    }

  };


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
            <div>
              <Header community={user.community} cartNum={0} />
              <div className="sidebar-content">
                {userInfo.admin ? <AdminSideBar /> : <SideBar />}
                <div className="address-container">
                  <form className="form-profile" >
                    <div className="profile-row">
                      <div>
                        <h1>Update Address</h1>
                        <div className="danger">{erroMessage}</div>
                        <div>
                          <label>Address</label>
                          <input type="text" placeholder={user.address} onChange={(e) => setAddress(e.target.value)} ></input>
                        </div>
                        <div>
                          <label>City</label>
                          <input type="text" placeholder={user.city} onChange={(e) => setCity(e.target.value)}></input>
                        </div>
                        <div>
                          <label>Province</label>
                          <input type="text" placeholder={user.province} onChange={(e) => setProvince(e.target.value)}></input>
                        </div>
                        <div>
                          <label>Postcode</label>
                          <input type="text" placeholder={user.postcode} onChange={(e) => setPostcode(e.target.value)}></input>
                        </div>
                        <div>
                          <label>Country</label>
                          <input type="text" placeholder={user.country} onChange={(e) => setCountry(e.target.value)}></input>
                        </div>
                      </div>
                    </div>

                  </form>
                  <div>
                    <div className="button-container">
                      <button className="button is-primary is-rounded" onClick={updateHandler}>Submit</button>
                      <Link to="/my-profile"><button className="button is-primary is-rounded" >Cancel</button></Link>
                    </div>
                  </div>

                </div>
              </div>
              <Footer />
            </div>
          )}
    </div>


  );
}
