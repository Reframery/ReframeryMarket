import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import data from './testData.json';

import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { createUser, deleteUser, getUser, searchAdminUsers, searchUnvalidatedUsers, signin, signout, updateUser, updateUserImage, validateUser } from '../actions/userActions';

import {
    ADMIN_LIST_FAIL,
    ADMIN_LIST_SUCCESS,
    UNVALIDATEUSER_LIST_FAIL,
    UNVALIDATEUSER_LIST_SUCCESS,
    USER_DELETE_FAIL,
    USER_DELETE_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_SUCCESS,
    USER_IMAGE_UPDATE_FAIL,
    USER_IMAGE_UPDATE_REQUEST,
    USER_IMAGE_UPDATE_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_SUCCESS,
    USER_SIGNOUT,
    USER_UPDATE_FAIL,
    USER_UPDATE_SUCCESS,
    USER_VALIDATE_FAIL,
    USER_VALIDATE_SUCCESS
} from '../constants/userConstants';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);

describe('User actions testing', () => {
    // Initialize mockstore with empty state
    var initialState;
    var store;

    beforeEach(() => {
        initialState = {};
        store = mockStore(initialState)
    });

    describe('createUser action', () => {

        it('create a user successfully with all the required information', async () => {
            mock.onPost("/users/user").replyOnce(200, data.user[0]);
            await store.dispatch(createUser('user02', 'user02@gmail.com', '1234', 'Canada'));
            const actions = store.getActions()
            const expectedPayload = {
                payload: data.user[0], type: USER_REGISTER_SUCCESS
            }
            expect(actions[1]).toEqual(expectedPayload)
        });

        it('should not create user with the same email and return the error message', async () => {
            mock.onPost("/users/user").replyOnce(400, { message: 'The email has been used' });
            await store.dispatch(createUser('user02', 'user02@gmail.com', '1234', 'Canada'));
            const actions = store.getActions()
            const expectedPayload = {
                payload: 'The email has been used', type: USER_REGISTER_FAIL
            }
            expect(actions[1]).toEqual(expectedPayload)
        });

        it('should not create user with the same email and return the default error message', async () => {
            mock.onPost("/users/user").replyOnce(400, { message: '' });
            await store.dispatch(createUser('user02', 'user02@gmail.com', '1234', 'Canada'));
            const actions = store.getActions()
            const expectedPayload = {
                payload: 'Request failed with status code 400', type: USER_REGISTER_FAIL
            }
            expect(actions[1]).toEqual(expectedPayload)
        });
    });

    describe('signin action', () => {

        it('sign in sucessfully with the correct email and password', async () => {
            mock.onPost("/users/signin/user02@gmail.com").replyOnce(200, { token: "ThisIsAToken" });
            await store.dispatch(signin('user02@gmail.com', '1234'));
            const actions = store.getActions()
            const expectedPayload = {
                payload: {
                    token: "ThisIsAToken"
                }, type: USER_SIGNIN_SUCCESS
            }
            expect(actions[1]).toEqual(expectedPayload)
        });

        it('should fail to sign in with the wrong password and return the error message', async () => {
            mock.onPost("/users/signin/user02@gmail.com").replyOnce(400, { message: 'Invalid email or password' });
            await store.dispatch(signin('user02@gmail.com', '12345'));
            const actions = store.getActions()
            const expectedPayload = {
                payload: 'Invalid email or password', type: USER_SIGNIN_FAIL
            }
            expect(actions[1]).toEqual(expectedPayload)
        });

        it('should fail to sign in with the wrong password and return the default error message', async () => {
            mock.onPost("/users/signin/user02@gmail.com").replyOnce(400, { message: '' });
            await store.dispatch(signin('user02@gmail.com', '12345'));
            const actions = store.getActions()
            const expectedPayload = {
                payload: 'Request failed with status code 400', type: USER_SIGNIN_FAIL
            }
            expect(actions[1]).toEqual(expectedPayload)
        });
    });

    describe('signout action', () => {

        it('update the user sucessfully when the user exists', async () => {
            store.dispatch(signout());
            const actions = store.getActions()
            const expectedPayload = {
                type: USER_SIGNOUT
            }
            expect(actions[0]).toEqual(expectedPayload)
        });
    });

    describe('getUser action', () => {

        it('get the user sucessfully when the user exists', async () => {
            mock.onGet("/users/user/user02@gmail.com").replyOnce(200, data.user[0]);
            await store.dispatch(getUser('user02@gmail.com'));
            const actions = store.getActions()
            const expectedPayload = {
                payload: data.user[0], type: USER_DETAILS_SUCCESS
            }
            expect(actions[1]).toEqual(expectedPayload)
        });

        it('fail to get the user when the user does not exit', async () => {
            mock.onGet("/users/user/user01@gmail.com").replyOnce(404, { message: 'User Not Found' });
            await store.dispatch(getUser('user01@gmail.com'));
            const actions = store.getActions()
            const expectedPayload = {
                payload: 'User Not Found', type: USER_DETAILS_FAIL
            }
            expect(actions[1]).toEqual(expectedPayload)
        });

        it('fail to get the user when the user does not exit and return the default error message', async () => {
            mock.onGet("/users/user/user01@gmail.com").replyOnce(404, { message: '' });
            await store.dispatch(getUser('user01@gmail.com'));
            const actions = store.getActions()
            const expectedPayload = {
                payload: 'Request failed with status code 404', type: USER_DETAILS_FAIL
            }
            expect(actions[1]).toEqual(expectedPayload)
        });

    });

    describe('updateUser action', () => {

        it('update the user sucessfully when the user exists', async () => {
            mock.onPut("/users/user/user02@gmail.com").replyOnce(200, data.user[1]);
            await store.dispatch(updateUser('user02@gmail.com', 'user03'));
            const actions = store.getActions()
            const expectedPayload = {
                payload: data.user[1], type: USER_UPDATE_SUCCESS
            }
            expect(actions[1]).toEqual(expectedPayload)
        });

        it('shoul fail to update when the user with empty input for the field of request and return error message', async () => {
            mock.onPut("/users/user/user02@gmail.com").replyOnce(400, { message: 'Fail to update the user information with no changes' });
            await store.dispatch(updateUser('user02@gmail.com', ''));
            const actions = store.getActions()
            const expectedPayload = {
                payload: 'Fail to update the user information with no changes', type: USER_UPDATE_FAIL
            }
            expect(actions[1]).toEqual(expectedPayload)
        });

        it('shoul fail to update when the user with empty input for the field of request and return the default error message', async () => {
            mock.onPut("/users/user/user02@gmail.com").replyOnce(400, { message: '' });
            await store.dispatch(updateUser('user02@gmail.com', ''));
            const actions = store.getActions()
            const expectedPayload = {
                payload: 'Request failed with status code 400', type: USER_UPDATE_FAIL
            }
            expect(actions[1]).toEqual(expectedPayload)
        });
    });

    describe('updateUserImage action', () => {

        it('update the user image sucessfully with a new value for the required field', async () => {
            mock.onPut("/users/uploadUserImage/user02@gmail.com").replyOnce(200, data.user[2]);
            await store.dispatch(updateUserImage('user02@gmail.com', '/image.jpg'));
            const actions = store.getActions()
            const expectedPayload = {
                payload: data.user[2], type: USER_IMAGE_UPDATE_SUCCESS
            }
            expect(actions[1]).toEqual(expectedPayload)
        });

        it('should fail to update the user image with empty string for the required field and return error message', async () => {
            mock.onPut("/users/uploadUserImage/user02@gmail.com").replyOnce(400, { message: 'Please upload a image file' });
            await store.dispatch(updateUserImage('user02@gmail.com', ''));
            const actions = store.getActions()
            const expectedPayload = [
                { type: USER_IMAGE_UPDATE_REQUEST, payload: 'user02@gmail.com' },
                {
                    type: USER_IMAGE_UPDATE_FAIL,
                    payload: 'Please upload a image file'
                }
            ]
            expect(actions).toEqual(expectedPayload)
        });

        it('should fail to update the user image with empty string for the required field and return a default error message', async () => {
            mock.onPut("/users/uploadUserImage/user02@gmail.com").replyOnce(400, { message: '' });
            await store.dispatch(updateUserImage('user02@gmail.com', ''));
            const actions = store.getActions()
            const expectedPayload = [
                { type: USER_IMAGE_UPDATE_REQUEST, payload: 'user02@gmail.com' },
                {
                    type: USER_IMAGE_UPDATE_FAIL,
                    payload: 'Request failed with status code 400'
                }
            ]
            expect(actions).toEqual(expectedPayload)
        });
    });

    describe('deleteUser action', () => {

        it('delete the user sucessfully', async () => {
            mock.onDelete("/users/user/user02@gmail.com").replyOnce(200, 'done');
            await store.dispatch(deleteUser('user02@gmail.com'));
            const actions = store.getActions();
            const expectedPayload = {
                payload: 'done', type: USER_DELETE_SUCCESS
            }
            expect(actions[1]).toEqual(expectedPayload)
        });

        it('should fail to delete the user if the user has pending transactions and return error message', async () => {
            mock.onDelete("/users/user/user02@gmail.com").replyOnce(400, { message: 'You can not delete the account since you have pending transactions' });
            await store.dispatch(deleteUser('user02@gmail.com'));
            const actions = store.getActions()
            const expectedPayload = {
                type: USER_DELETE_FAIL,
                payload: 'You can not delete the account since you have pending transactions'
            }
            expect(actions[1]).toEqual(expectedPayload)
        });

        it('should fail to delete the user if the user has pending transactions and return a default error message', async () => {
            mock.onDelete("/users/user/user02@gmail.com").replyOnce(400, { message: '' });
            await store.dispatch(deleteUser('user02@gmail.com'));
            const actions = store.getActions()
            const expectedPayload = {
                type: USER_DELETE_FAIL,
                payload: 'Request failed with status code 400'
            }
            expect(actions[1]).toEqual(expectedPayload)
        });
    });

    
    describe('validateUser action', () => {

        it('should validate the user sucessfully when the user is unvalidated', async () => {
            mock.onPut("/users/user/validateUser/user02@gmail.com").replyOnce(200, data.user[3]);
            await store.dispatch(validateUser('user02@gmail.com'));
            const actions = store.getActions()
            const expectedPayload = {
                payload: data.user[3], type: USER_VALIDATE_SUCCESS
            }
            expect(actions[1]).toEqual(expectedPayload)
        });

        it('should not validate the user when the user status is validated and return the error message', async () => {
            mock.onPut("/users/user/validateUser/user02@gmail.com").replyOnce(400, {message: 'The user has been already validated'});
            await store.dispatch(validateUser('user02@gmail.com'));
            const actions = store.getActions()
            const expectedPayload = {
                payload: 'The user has been already validated', type: USER_VALIDATE_FAIL
            }
            expect(actions[1]).toEqual(expectedPayload)
        }); 
        
        it('should not validate the user when the user status is validated and return default error message', async () => {
            mock.onPut("/users/user/validateUser/user02@gmail.com").replyOnce(400, {message: ''});
            await store.dispatch(validateUser('user02@gmail.com'));
            const actions = store.getActions()
            const expectedPayload = {
                payload:'Request failed with status code 400',
                type: USER_VALIDATE_FAIL
            }
            expect(actions[1]).toEqual(expectedPayload)
        }); 

    });

    describe('searchAdminUsers action', () => {

        it('should get a list of admin users when there are admin users in the system', async () => {
            mock.onGet("/users/searchAdminUsers").replyOnce(200, data.admins);
            await store.dispatch(searchAdminUsers());
            const actions = store.getActions()
            const expectedPayload = {
                payload: data.admins, type: ADMIN_LIST_SUCCESS
            }
            expect(actions[1]).toEqual(expectedPayload)
        });

        it('should get empty list when there is no admin user in the system', async () => {
            mock.onGet("/users/searchAdminUsers").replyOnce(200, data.emptylist);
            await store.dispatch(searchAdminUsers());
            const actions = store.getActions()
            const expectedPayload = {
                payload: [], type: ADMIN_LIST_SUCCESS
            }
            expect(actions[1]).toEqual(expectedPayload)
        });

        it('should not get a list when the user is unauthorized and return a error', async () => {
            mock.onGet("/users/searchAdminUsers").replyOnce(401, {message: 'You have no authorization to search the admin users'});
            await store.dispatch(searchAdminUsers());
            const actions = store.getActions()
            const expectedPayload = {
                payload: 'You have no authorization to search the admin users', type: ADMIN_LIST_FAIL
            }
            expect(actions[1]).toEqual(expectedPayload)
        });

        it('should not get a list and return a default error', async () => {
            mock.onGet("/users/searchAdminUsers").replyOnce(401, {message: ''});
            await store.dispatch(searchAdminUsers());
            const actions = store.getActions()
            const expectedPayload = {
                payload: 'Request failed with status code 401', type: ADMIN_LIST_FAIL
            }
            expect(actions[1]).toEqual(expectedPayload)
        });

    });

    describe('searchUnvalidatedUsers action', () => {

        it('should get a list of unvalidated users when there are some unvalidated users in the system', async () => {
            mock.onGet("/users/searchUnvalidatedUsers").replyOnce(200, data.unvalidateduser);
            await store.dispatch(searchUnvalidatedUsers());
            const actions = store.getActions()
            const expectedPayload = {
                payload: data.unvalidateduser, type: UNVALIDATEUSER_LIST_SUCCESS
            }
            expect(actions[1]).toEqual(expectedPayload)
        });

        it('should get empty list when there is no unvalidated user in the system', async () => {
            mock.onGet("/users/searchUnvalidatedUsers").replyOnce(200, []);
            await store.dispatch(searchUnvalidatedUsers());
            const actions = store.getActions()
            const expectedPayload = {
                payload: [], type: UNVALIDATEUSER_LIST_SUCCESS
            }
            expect(actions[1]).toEqual(expectedPayload)
        });

        it('should not get the list of unvalidated users when the user has no authorization and return a message', async () => {
            mock.onGet("/users/searchUnvalidatedUsers").replyOnce(401, {message: 'You have no authorization to search the users'});
            await store.dispatch(searchUnvalidatedUsers());
            const actions = store.getActions()
            const expectedPayload = {
                payload: 'You have no authorization to search the users', type: UNVALIDATEUSER_LIST_FAIL
            }
            expect(actions[1]).toEqual(expectedPayload)
        });

        it('should not get the list of unvalidated users and return default error message', async () => {
            mock.onGet("/users/searchUnvalidatedUsers").replyOnce(401, {message: ''});
            await store.dispatch(searchUnvalidatedUsers());
            const actions = store.getActions()
            const expectedPayload = {
                payload: 'Request failed with status code 401', type: UNVALIDATEUSER_LIST_FAIL
            }
            expect(actions[1]).toEqual(expectedPayload)
        });

    });


});