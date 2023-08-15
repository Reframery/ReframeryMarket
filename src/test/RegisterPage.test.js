import React from "react";
import { Provider } from 'react-redux'
import { mount } from 'enzyme';
import RegisterPage from '../pages/RegisterPage';
import WellcomeComponent from '../components/WellcomeComponent.js';
import { BrowserRouter as Router } from "react-router-dom";
import store from "../store";



const simulateChangeOnInput = (wrapper, inputSelector, newValue) => {
    let input = wrapper.find(inputSelector);
    input.simulate('change', {
        target: { value: newValue },
    })
    return wrapper.find(inputSelector);
}

describe('RegisterPage UI and functions testing', () => {
    describe('field tests in register page', () => {
        var registerPageWrapper;

        beforeEach(() => {
            registerPageWrapper = mount(<Provider store={store}>
                <Router>
                    <RegisterPage />
                </Router>
            </Provider>);
        });

        it('should have a Wellcome Component', () => {
            // console.log(registerPageWrapper.find('input[type="text"]').getElement());
            // console.log(registerPageWrapper.find('#username').getElement());
            const wellcomeComponent = registerPageWrapper.find(WellcomeComponent);
            expect(wellcomeComponent.length).toBe(1);
        });

        it('should have an username field', () => {
            expect(registerPageWrapper.find('input[type="text"]').getElement().props.id.includes('username')).toBe(true);
        });

        it('should have an email field', () => {
            expect(registerPageWrapper.find('input[type="email"]').length).toBe(1);
        });

        it('should have a password field and a confirmed password field', () => {
            expect(registerPageWrapper.find('input[type="password"]').length).toBe(2);
        });

        it('should have a checkbox to chooose a community in the range of Canada, USA, Brazil, mexico', () => {
            expect(registerPageWrapper.find('select').length).toBe(1);
            expect(registerPageWrapper.find('select').text().includes('Canada')).toBe(true);
            expect(registerPageWrapper.find('select').text().includes('USA')).toBe(true);
            expect(registerPageWrapper.find('select').text().includes('Brazil')).toBe(true);
            expect(registerPageWrapper.find('select').text().includes('Mexico')).toBe(true);
        });

        it('should have a submit button', () => {
            expect(registerPageWrapper.find('button').length).toBe(1);
        });
    });

    describe('RegisterPage function testing', () => {

        let registerPageWrapper;

        beforeEach(() => {
            registerPageWrapper = mount(<Provider store={store}>
                <Router>
                    <RegisterPage />
                </Router>
            </Provider>);

            // jest.resetAllMocoks();
            jest.clearAllMocks()
        });

        it('should set username value on change evnet', () => {
            const updateUserNameInput = simulateChangeOnInput(
                registerPageWrapper,
                '#username',
                'user01'
            )
            expect(updateUserNameInput.instance().value).toBe('user01');
        });

        it('should set email value on change evnet', () => {
            const updateEmailInput = simulateChangeOnInput(
                registerPageWrapper,
                '#email',
                'user01@gmail.com'
            )
            expect(updateEmailInput.instance().value).toBe('user01@gmail.com');
        });

        it('should set password value on change evnet', () => {
            const updatePasswordInput = simulateChangeOnInput(
                registerPageWrapper,
                '#password',
                '1234'
            )
            expect(updatePasswordInput.instance().value).toBe('1234');
        });

        it('should set confirmPassword value on change event', () => {
            const updateConfirmedPasswordInput = simulateChangeOnInput(
                registerPageWrapper,
                '#confirmPassword',
                '1234'
            )
            expect(updateConfirmedPasswordInput.instance().value).toBe('1234');
        });

        it('should set community value on changes', () => {
            let updateCommunityInput = simulateChangeOnInput(
                registerPageWrapper,
                'select',
                'USA'
            )
            expect(updateCommunityInput.instance().value).toBe('USA');
            updateCommunityInput = simulateChangeOnInput(
                registerPageWrapper,
                'select',
                'Brazil'
            )
            expect(updateCommunityInput.instance().value).toBe('Brazil');
            updateCommunityInput = simulateChangeOnInput(
                registerPageWrapper,
                'select',
                'Mexico'
            )
            expect(updateCommunityInput.instance().value).toBe('Mexico');
        });

        it('shuold set all values on changes', () => {
            const usernameInput = simulateChangeOnInput(registerPageWrapper, '#username', 'user02')
            const emailInput = simulateChangeOnInput(registerPageWrapper, '#email', 'user02@gmail.com')
            const passwordInput = simulateChangeOnInput(registerPageWrapper, '#password', '1234')
            const confirmPasswordInput = simulateChangeOnInput(registerPageWrapper, '#confirmPassword', '1234')
            const communityInput = simulateChangeOnInput(registerPageWrapper, 'select', 'Canada')
            expect(usernameInput.instance().value).toEqual('user02');
            expect(emailInput.instance().value).toEqual('user02@gmail.com');
            expect(passwordInput.instance().value).toEqual('1234');
            expect(confirmPasswordInput.instance().value).toEqual('1234');
            expect(communityInput.instance().value).toEqual('Canada');
        });

            it('should submit the form and have state changed', async () => {
                simulateChangeOnInput(registerPageWrapper, '#username', 'user02')
                simulateChangeOnInput(registerPageWrapper, '#email', 'user02@gmail.com')
                 simulateChangeOnInput(registerPageWrapper, '#password', '1234')
                simulateChangeOnInput(registerPageWrapper, '#confirmPassword', '1234')
                simulateChangeOnInput(registerPageWrapper, 'select', 'Canada')
                const submit = registerPageWrapper.find('button'); 
                registerPageWrapper.update();           
                submit.simulate('click');           
                // expect(registerPageWrapper.props().store.getState().userRegister).not.toStrictEqual({});               
            });
    });    

})