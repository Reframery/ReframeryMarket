import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { isValidUsername } from "lib/validations"
import AdminSideBar from "components/AdminSidebar"
import SideBar from "components/SideBar"
// import 'react-phone-number-input/style.css'
import { useAuth } from "hooks/useAuth"
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input/input"

export default function MyProfilePage() {
  const navigate = useNavigate()
  // get sign in user info
  const { user } = useAuth()

  // constant for update information
  const [username, setUsername] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [birthday, setBirthday] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const today = new Date()

  if (!user) return

  //update user name
  const updateUserNameHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (username === "") {
      setErrorMessage("! Empty input")
    } else if (!isValidUsername(username)) {
      setErrorMessage("! Your user name should not exceed 15 characters")
    } else {
      // dispatch(updateProfile(username))
    }
  }

  //update user phone number
  const updateUserPhoneHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (phoneNumber === "") {
      setErrorMessage("! Empty input")
    } else if (!isValidPhoneNumber(phoneNumber)) {
      setErrorMessage("! Invalid phone number")
    } else {
      // dispatch(updateProfile({ phone: phoneNumber }))
    }
  }

  //update user first name
  const updateUserFirstNameHandler = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()
    if (firstName === "") {
      setErrorMessage("! Empty input")
    } else {
      // dispatch(updateProfile({ firstName: firstName }))
    }
  }

  //update user last name
  const updateUserLastNameHandler = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()
    if (lastName === "") {
      setErrorMessage("! Empty input")
    } else {
      // dispatch(updateProfile({ lastName: lastName }))
    }
  }

  //update user birthday
  const updateUserBirthdayHandler = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()
    if (birthday === "") {
      setErrorMessage("! Empty Input")
    } else if (
      parseInt(birthday.split("-")[0]) > today.getFullYear() ||
      (parseInt(birthday.split("-")[0]) === today.getFullYear() &&
        parseInt(birthday.split("-")[1]) > today.getMonth() + 1) ||
      (parseInt(birthday.split("-")[0]) === today.getFullYear() &&
        parseInt(birthday.split("-")[1]) === today.getMonth() + 1 &&
        parseInt(birthday.split("-")[2]) > today.getDate())
    ) {
      setErrorMessage("! Invalid birthday")
    } else {
      // dispatch(updateProfile({ dob: birthday }))
    }
  }

  // function for remove the user from the system
  const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const confirm = window.confirm(
      "Are you sure to delete the account from the system?"
    )
    if (confirm) {
      if (user?.marketProfile.currentCredit ?? Infinity < 1) {
        // dispatch(deleteUser(userInfo.email))
        // dispatch(signout())
        navigate("/")
      } else {
        setErrorMessage(
          "You can not delete this account since you have a balance!"
        )
      }
    }
  }
  return (
    <div className="sidebar-content">
      {user?.role === "ADMIN" ? <AdminSideBar /> : <SideBar />}
      <div className="profile-container">
        <form className="form-profile">
          <div className="danger">{errorMessage}</div>
          <div className="title-image">
            <h1>My Profile</h1>
          </div>

          <div className="profile-row">
            <div>
              <label>Email</label>
              <input
                id="email"
                type="email"
                placeholder={user?.email}
                readOnly
              />
            </div>
            <div>
              <label>User Name</label>
              <input
                id="username"
                type="text"
                placeholder={user?.marketProfile.username ?? ""}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
              <button onClick={updateUserNameHandler}> Update</button>
            </div>
            <div>
              <label>Phone</label>
              <PhoneInput
                placeholder={user?.marketProfile.phone ?? ""}
                onChange={(value) =>
                  setPhoneNumber(value ? value.toString() : "")
                }
              />
              {user?.marketProfile.phone === "" ? (
                <button onClick={updateUserPhoneHandler}>Add</button>
              ) : (
                <button onClick={updateUserPhoneHandler}>Update</button>
              )}
            </div>
            <div>
              <label>Address</label>
              <input
                id="address"
                type="text"
                placeholder={
                  user?.marketProfile.addressLine1 +
                  " " +
                  user?.marketProfile.addressLine2 +
                  " " +
                  user?.marketProfile.city +
                  " " +
                  user?.marketProfile.region +
                  " " +
                  user?.marketProfile.postalCode +
                  ", " +
                  user?.marketProfile.communityName
                }
              ></input>
              {user?.marketProfile.addressLine1 === "" ? (
                <Link to="/update-user-address">
                  <button>Add</button>
                </Link>
              ) : (
                <Link to="/update-user-address">
                  <button>Update</button>
                </Link>
              )}
            </div>
            <div>
              <label>First Name</label>
              <input
                id="firstName"
                type="text"
                placeholder={user?.marketProfile.firstName ?? ""}
                onChange={(e) => setFirstName(e.target.value)}
              ></input>
              {user?.marketProfile.firstName === "" ? (
                <button onClick={updateUserFirstNameHandler}>Add</button>
              ) : (
                <button onClick={updateUserFirstNameHandler}>Update</button>
              )}
            </div>
            <div>
              <label>Last Name</label>
              <input
                id="lastName"
                type="text"
                placeholder={user?.marketProfile.lastName ?? ""}
                onChange={(e) => setLastName(e.target.value)}
              ></input>
              {user?.marketProfile.lastName === "" ? (
                <button onClick={updateUserLastNameHandler}>Add</button>
              ) : (
                <button onClick={updateUserLastNameHandler}>Update</button>
              )}
            </div>
            <div>
              <label>Birthday</label>
              <input
                id="birthday"
                type="text"
                onFocus={(e) => (e.currentTarget.type = "date")}
                onBlur={(e) => (e.currentTarget.type = "text")}
                placeholder={
                  user?.marketProfile.dob
                    ? user?.marketProfile.dob.slice(0, 10)
                    : ""
                }
                onChange={(e) => setBirthday(e.target.value)}
              ></input>
              {user?.marketProfile.dob === "" ? (
                <button onClick={updateUserBirthdayHandler}>Add</button>
              ) : (
                <button onClick={updateUserBirthdayHandler}>Update</button>
              )}
            </div>
            <div>
              <button type="button" onClick={deleteHandler}>
                Unsubscribe
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
