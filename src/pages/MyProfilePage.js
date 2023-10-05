import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router";
import {
  deleteUser, getUser, signout, updateProfile
} from "../actions/userActions";
import Header from 'components/Header';
import SideBar from "components/SideBar";
import AdminSideBar from "components/AdminSidebar";
import Footer from 'components/Footer'

// import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input/input'
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Link } from "react-router-dom";

export default function MyProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // get sign in user info
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  // get sign in user detail informaton
  const userGet = useSelector(state => state.userGet);
  const { loading, error, user } = userGet;

  // get the updated user object
  const userUpdate = useSelector(state => state.userUpdate);
  const { user: updatedUser } = userUpdate;

  // get the updated user object after update the user image
  const userImageUpdate = useSelector(state => state.userImageUpdate);
  const { user: updatedUserImage } = userImageUpdate;

  // constant for update information
  const [username, setUsername] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [userImageURL, setUserImageURL] = useState('');
  const [erroMessage, setErrorMessage] = useState('');
  const today = new Date();

  // check if the first name and last is valid
  const isValidUserName = (str) => {
    const reLength = new RegExp('^.{1,15}$');
    return reLength.test(str)
  }

  // check if the first name and last is valid
  const isValidPhoneNumber = (str) => {
    const reLength = new RegExp('^.{11,20}$');
    return reLength.test(str)
  }

  // check if the password contains at least one upper case letter and one lowercase letter and one number
  const isValidPassword = (str) => {
    const reContainUppercase = new RegExp('^.*[A-Z].*$');
    const reContainLowercase = new RegExp('^.*[a-z].*$');
    const reContainNumer = new RegExp('^.*[0-9].*$');
    const reLength = new RegExp('^.{6,}$');
    return reContainUppercase.test(str) && reContainLowercase.test(str) && reContainNumer.test(str) && reLength.test(str)
  }

  //update user name 
  const updateUserNameHandler = (e) => {
    e.preventDefault();
    if (username === "") {
      setErrorMessage("! Empty input");
    } else if (!isValidUserName(username)) {
      setErrorMessage("! Your user name should not exceed 15 characters");
    }
    else {
      dispatch(updateProfile({username: username}));
    }
  };

  //update user company name
  const updateCompanyNameHandler = (e) => {
    e.preventDefault();
    if (company === "") {
      setErrorMessage("! Empty input");
    } else {
      dispatch(updateProfile({company: company}));
    }
  };

  //update user phone number
  const updateUserPhoneHandler = (e) => {
    e.preventDefault();
    if (phoneNumber === "") {
      setErrorMessage("! Empty input");
    }
    else if (!isValidPhoneNumber(phoneNumber)) {
      setErrorMessage("! Invalid phone number");
    }
    else {
      dispatch(updateProfile({phone: phoneNumber}));
    }
  };

  //update user first name
  const updateUserFirstNameHandler = (e) => {
    e.preventDefault();
    if (firstName === "") {
      setErrorMessage("! Empty input");
    } else {
      dispatch(updateProfile({firstName: firstName}));
    }
  };

  //update user last name
  const updateUserLastNameHandler = (e) => {
    e.preventDefault();
    if (lastName === "") {
      setErrorMessage("! Empty input");
    } else {
      dispatch(updateProfile({lastName: lastName}));
    }
  };

  //update user birthday
  const updateUserBirthdayHandler = (e) => {
    e.preventDefault();
    if (birthday === "") {
      setErrorMessage("! Empty Input");
    } else if (parseInt(parseInt(birthday.split("-")[0])) > today.getFullYear()
      || (parseInt(birthday.split("-")[0]) === today.getFullYear() && parseInt(birthday.split("-")[1]) > (today.getMonth()+1))
      || (parseInt(birthday.split("-")[0]) === today.getFullYear() && parseInt(birthday.split("-")[1]) === (today.getMonth()+1) && parseInt(birthday.split("-")[2]) > today.getDate())) {
        setErrorMessage("! Invalid birthday");
    }
    else {
      dispatch(updateProfile({dob: birthday}));
    }
  };

  // function for remove the user from the system
  const deleteHandler = (e) => {
    e.preventDefault();
    const confirm = window.confirm("Are you sure to delete the account from the system?");
    if (confirm) {
      if (userInfo.currentCredit < 1) {
        dispatch(deleteUser(userInfo.email));
        dispatch(signout());
        navigate('/');
      }
      else {
        setErrorMessage("You can not delete this account since you have have a balance!");
      }
    }
  };

  useEffect(() => {
    dispatch(getUser());
    if (updatedUser || updatedUserImage) {
      window.location.reload();
      localStorage.setItem('username', updatedUser.username);
    }
  }, [dispatch, userInfo, updatedUser, updatedUserImage]);

  const email  = JSON.parse(localStorage.getItem('userInfo')).email;

  return (
    <div className="page-container">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Header community={user.community} cartNum={0} />
          <div className="sidebar-content">
            {userInfo.admin ? <AdminSideBar /> : <SideBar />}
            <div className="profile-container">
              <form className="form-profile" >
                <div className="danger">{erroMessage}</div>
                <div className="title-image">
                  <h1>My Profile</h1>
                </div>


                <div className="profile-row">
                  <div>
                    <label >Email</label>
                    <input id="email" type="email" placeholder={email} readOnly></input>
                  </div>
                  <div>
                    <label>User Name</label>
                    <input id="username" type="text" placeholder={user.username} onChange={(e) => setUsername(e.target.value)}></input>
                    <button onClick={updateUserNameHandler}> Update</button>
                  </div>               
                  <div>
                    <label >Phone</label>
                    <PhoneInput placeholder={user.phone} onChange={setPhoneNumber} />
                    {user.phoneNumber === "" ? (<button onClick={updateUserPhoneHandler}>Add</button>) :
                      (<button onClick={updateUserPhoneHandler}>Update</button>)}
                  </div>
                  <div>
                    <label >Address</label>
                    <input id="address" type="text"
                      placeholder={user.addressLine1  + " " + user.addressLine2 + " " + user.city + " "
                        + user.region + " " + user.postalCode + ", " + user.countryId} >
                    </input>
                    {user.address === "" ? (<Link to="/update-user-address"><button>Add</button></Link>) :
                      (<Link to="/update-user-address"><button >Update</button></Link>)}
                  </div>
                  <div>
                    <label >First Name</label>
                    <input id="firstName" type="text" placeholder={user.firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                    {user.firstName === "" ? (<button onClick={updateUserFirstNameHandler}>Add</button>) :
                      (<button onClick={updateUserFirstNameHandler}>Update</button>)}
                  </div>
                  <div>
                    <label >Last Name</label>
                    <input id="lastName" type="text" placeholder={user.lastName} onChange={(e) => setLastName(e.target.value)}></input>
                    {user.lastName === "" ? (<button onClick={updateUserLastNameHandler}>Add</button>) :
                      (<button onClick={updateUserLastNameHandler}>Update</button>)}
                  </div>
                  <div>
                    <label >Birthday</label>
                    <input id="birthday" type="text" onFocus={(e) => (e.currentTarget.type = "date")} onBlur={(e) => (e.currentTarget.type = "text")} placeholder={user.dob ? user.dob.slice(0, 10): ""} onChange={(e) => setBirthday(e.target.value)}></input>
                    {user.birthday === "" ? (<button onClick={updateUserBirthdayHandler}>Add</button>) :
                      (<button onClick={updateUserBirthdayHandler}>Update</button>)}
                  </div>
                  <div>
                    <label >Register Time</label>
                    <input id="registerTime" placeholder={user.createdAt.slice(0, 10)} readOnly></input>
                    <button onClick={deleteHandler} >Unsubscribe</button>
                  </div>
                </div>

              </form>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>


  );
}
