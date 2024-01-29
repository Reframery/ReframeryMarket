import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import { shallow } from "enzyme"
import HomePage from "../pages/HomePage"
import store from "../app/store"

import MockAdapter from "axios-mock-adapter"
import axios from "axios"
import { signin } from "redux/actions/userActions"
const mock = new MockAdapter(axios)

describe("HomePage UI and functions testing", () => {
  describe("test component before user sign in", () => {
    let homePageWrapper
    beforeEach(() => {
      homePageWrapper = shallow(
        <Provider store={store}>
          <Router>
            <HomePage />
          </Router>
        </Provider>
      )
    })

    it("should have three links for about us, register, signin before sign in", () => {
      expect(homePageWrapper.find("Link").length).toBe(3)
    })
  })

  describe("test component after user sign in", () => {
    let homePageWrapper
    beforeEach(async () => {
      mock.onPost("/users/signin/user02@gmail.com").reply(200, {
        user: {
          username: "user02",
          country: "Canada",
          admin: false,
          validateStatus: true,
          manager: false,
        },
        token: "thisIsAToken",
      })
      await store.dispatch(signin("user02@gmail.com", "1234"))
      const user = {
        user: {
          username: "user02",
          country: "Canada",
          admin: false,
          validateStatus: true,
          manager: false,
        },
        token: "thisIsAToken",
      }

      homePageWrapper = shallow(
        <Provider store={store}>
          <Router>
            <HomePage userInfo={user} />
          </Router>
        </Provider>
      )
    })

    it("should not have links after sign in", () => {
      expect(homePageWrapper.find("Link").length).toBe(0)
    })
  })
})
