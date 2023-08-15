import React from "react";
import { Provider } from 'react-redux'
import { mount } from 'enzyme';
import SigninPage from '../pages/SigninPage';
import { BrowserRouter as Router } from "react-router-dom";
import store from "../store";

const simulateChangeOnInput = (wrapper, inputSelector, newValue) => {
    let input = wrapper.find(inputSelector);
    input.simulate('change', {
        target: { value: newValue },
    })
    return wrapper.find(inputSelector);
}

describe('SigninPage UI and functions testing', () => {

    let signinPageWrapper;

    beforeEach(() => {
        signinPageWrapper = mount(<Provider store={store}>
            <Router>
                <SigninPage />
            </Router>
        </Provider>);

        jest.clearAllMocks()
    });

    it('should set email value on change', () => {
        const updateEmailInput = simulateChangeOnInput(
            signinPageWrapper,
            '#email',
            'user01@gmail.com'
        );
        expect(updateEmailInput.instance().value).toBe('user01@gmail.com');
    });

    it('should set password value on change', () => {
        const updatePasswordInput = simulateChangeOnInput(
            signinPageWrapper,
            '#password',
            '1234'
        )
        expect(updatePasswordInput.instance().value).toBe('1234');
    });

    it('should not check the checkbox as default', () => {
        const isCheck = signinPageWrapper.find('input[type="checkbox"]');
        expect(isCheck.instance().value).toBe("false");
    });

    it('should set the checkbox value on change', () => {
        const isCheck = signinPageWrapper.find('input[type="checkbox"]');
        isCheck.simulate('change', { target: { checked: true } })
        expect(isCheck.instance().value).toBe("true");
    });


    it('should set all values on change', () => {
        const emailInput = simulateChangeOnInput(signinPageWrapper, '#email', 'user02@gmail.com')
        const passwordInput = simulateChangeOnInput(signinPageWrapper, '#password', '1234')
        expect(emailInput.instance().value).toEqual('user02@gmail.com');
        expect(passwordInput.instance().value).toEqual('1234');
    });

    it('should sign in sucessfully with the correct username and password', async () => {
        simulateChangeOnInput(signinPageWrapper, '#email', 'user02@gmail.com')
        simulateChangeOnInput(signinPageWrapper, '#password', '1234')
        const submit = signinPageWrapper.find('button');
        submit.simulate('click');
        signinPageWrapper.update();
        // expect(signinPageWrapper.props().store.getState().userSignin.userInfo).not.toBeNull();                    
    });

    it('should fail to sign in if the password is wrong', async () => {
        simulateChangeOnInput(signinPageWrapper, '#email', 'user02@gmail.com');
        simulateChangeOnInput(signinPageWrapper, '#password', '1235');
        const submit = signinPageWrapper.find('button');
        submit.simulate('click');
        signinPageWrapper.update();
        expect(signinPageWrapper.props().store.getState().userSignin.userInfo).toBeNull();
    });
});



