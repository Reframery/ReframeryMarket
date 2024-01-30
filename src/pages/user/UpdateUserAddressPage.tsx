import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import SideBar from "components/SideBar"
import AdminSideBar from "components/AdminSidebar"
import { Link } from "react-router-dom"

import {
  isValidAddress,
  isValidCityAndCountry,
  isValidPostcode,
} from "lib/validations"
import { useAuth } from "hooks/useAuth"

export default function UpdateUserAddressPage() {
  const navigate = useNavigate()
  // get sign in user token
  const { user } = useAuth()

  // constant for updating address
  const [address, setAddress] = useState("")
  const [address2, setAddress2] = useState("")
  const [city, setCity] = useState("")
  const [province, setProvince] = useState("")
  const [postcode, setPostcode] = useState("")
  const [country, setCountry] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  // function for updating user address
  const updateHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (
      address === "" ||
      city === "" ||
      province === "" ||
      country === "" ||
      postcode === ""
    ) {
      setErrorMessage("Empty input")
    } else if (!isValidAddress(address)) {
      setErrorMessage("Invalid address")
    } else if (!isValidAddress(address2)) {
      setErrorMessage("Invalid address")
    } else if (!isValidCityAndCountry(city)) {
      setErrorMessage("Invalid city name")
    } else if (!isValidCityAndCountry(province)) {
      setErrorMessage("Invalid province name")
    } else if (!isValidPostcode(postcode)) {
      setErrorMessage("Invalid postcode")
    } else if (!isValidCityAndCountry(country)) {
      setErrorMessage("Invalid country name")
    } else {
      const confirm = window.confirm(
        "Are you sure to update your personal information?"
      )
      if (confirm) {
        //if the input value for the field is empty, keep the original value of the field
        // dispatch(updateUserAddress(userInfo.email, address, city, province, country, postcode));
        navigate("/my-profile")
      }
    }
  }

  if (!user) return

  return (
    <div>
      <div className="sidebar-content">
        {user.role === "ADMIN" ? <AdminSideBar /> : <SideBar />}
        <div className="address-container">
          <form className="form-profile">
            <div className="profile-row">
              <div>
                <h1>Update Address</h1>
                <div className="danger">{errorMessage}</div>
                <div>
                  <label>Address Line 1</label>
                  <input
                    type="text"
                    placeholder={user.marketProfile.addressLine1 ?? ""}
                    onChange={(e) => setAddress(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label>Address Line 2</label>
                  <input
                    type="text"
                    placeholder={user.marketProfile.addressLine2 ?? ""}
                    onChange={(e) => setAddress2(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label>City</label>
                  <input
                    type="text"
                    placeholder={user.marketProfile.city ?? ""}
                    onChange={(e) => setCity(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label>Province</label>
                  <input
                    type="text"
                    placeholder={user.marketProfile.region ?? ""}
                    onChange={(e) => setProvince(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label>Postcode</label>
                  <input
                    type="text"
                    placeholder={user.marketProfile.postalCode ?? ""}
                    onChange={(e) => setPostcode(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label>Country</label>
                  <input
                    type="text"
                    placeholder={user.marketProfile.communityName ?? ""}
                    onChange={(e) => setCountry(e.target.value)}
                  ></input>
                </div>
              </div>
            </div>
          </form>
          <div>
            <div className="button-container">
              <button
                className="button is-primary is-rounded"
                onClick={updateHandler}
              >
                Submit
              </button>
              <Link to="/my-profile">
                <button className="button is-primary is-rounded">Cancel</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
