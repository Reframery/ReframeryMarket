import React from "react";
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme';
import MyProfilePage from '../pages/MyProfilePage';
import { BrowserRouter as Router } from "react-router-dom";
import store from "../store";
import { signin } from "actions/userActions";

import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
const mock = new MockAdapter(axios);

describe('MyProfilePage compoment testing', () => {
    var profilePageWrapper;
    
        beforeEach(async () => {
            mock.onPost("/users/signin/user02@gmail.com").reply(200, {
                "user": {
                    "username": "user02",
                    "country": "Canada",
                    "admin": false,
                    "validateStatus": true,
                    "manager": false,
                },
                "token": "thisIsAToken"
            });
            await store.dispatch(signin("user02@gmail.com", "1234"))
            
            profilePageWrapper = mount(<Provider store={store}>            
                <Router>
                    <MyProfilePage />
                </Router>
            </Provider>);
        });

    describe('test component', () => {       
    
        it('should render the page when the user sign in', () => {
            // console.log(profilePageWrapper.props().store.getState().userSignin);
            // console.log(profilePageWrapper.find('form').length);    
            expect(profilePageWrapper.find('form').length).toBe(1);
        });  
    
    }); 
    

});




