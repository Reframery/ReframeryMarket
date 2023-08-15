import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import data from './testData.json';

import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { BALANCE_ADD_FAIL, BALANCE_ADD_SUCCESS, BALANCE_DEDUCT_FAIL, BALANCE_DEDUCT_SUCCESS, BALANCE_GET_FAIL, BALANCE_GET_SUCCESS, TRANSACTION_GET_FAIL, TRANSACTION_GET_SUCCESS, TRANSACTION_OF_USER_GET_FAIL, TRANSACTION_OF_USER_GET_SUCCESS } from 'constants/transactionConstants';
import { getTransaction, getTransactionsOfUser, getBalance, addBalanceToUser, deductBalanceFromUser} from '../actions/transactionActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);

describe('Transaction actions testing', () => {
    var initialState;
    var store;

    beforeEach(() => {
        initialState = {};
        store = mockStore(initialState)
    });

    describe('getTransaction action', () => {
        it('should get the transaction record sucessfully if the transaction exists', async () => {
            mock.onGet("/transactions/transaction/user02@gmail.com").reply(200, data.transactions[0]);
            await store.dispatch(getTransaction('user02@gmail.com'));
            const actions = store.getActions()
            const expectedPayload = {
                payload: data.transactions[0], type: TRANSACTION_GET_SUCCESS
            }
            expect(actions[1]).toEqual(expectedPayload)
        });

        it('should fail to get the transaction record if the transaction does not exit', async () => {
            mock.onGet("transactions/transaction/2222").reply(404, { message: '' });
            await store.dispatch(getTransaction('2222'));
            const actions = store.getActions()
            const expectedPayload = {
                payload: 'Request failed with status code 404', type: TRANSACTION_GET_FAIL
            }
            expect(actions[1]).toEqual(expectedPayload)
        });
    });

    describe('getTransactionsOfUser action', () => {
        it('should get the transaction list sucessfully if the user exists', async () => {
            mock.onGet("/transactions/getTransactionsOfUser/user02@gmail.com-10-1-reversed").reply(200, data.transactions);
            await store.dispatch(getTransactionsOfUser('user02@gmail.com', 10, 1, 'reversed'));
            const actions = store.getActions()
            const expectedPayload = {
                payload: data.transactions, type: TRANSACTION_OF_USER_GET_SUCCESS
            }
            expect(actions[1]).toEqual(expectedPayload)
        });

        it('should fail to get the transaction list if the user does not exit', async () => {
            mock.onGet("transactions/getTransactionsOfUser/user04@gmail.com-10-1-reversed").reply(404, { message: '' });
            await store.dispatch(getTransactionsOfUser('user04@gmail.com', 10, 1, 'reversed'));
            const actions = store.getActions()
            const expectedPayload = {
                payload: 'Request failed with status code 404', type: TRANSACTION_OF_USER_GET_FAIL
            }
            expect(actions[1]).toEqual(expectedPayload)
        });
    });

    describe('getBalance action', () => {
        it('should get the balance sucessfully for the given user if the user exists', async () => {
            mock.onGet("/transactions/balance/user02@gmail.com").reply(200, 25);
            await store.dispatch(getBalance('user02@gmail.com'));
            const actions = store.getActions()
            const expectedPayload = {
                payload: 25, type: BALANCE_GET_SUCCESS
            }
            expect(actions[1]).toEqual(expectedPayload)
        });

        it('should fail to get the transaction record if the user does not exit', async () => {
            mock.onGet("transactions/balance/user04@gmail.com").reply(404, { message: '' });
            await store.dispatch(getBalance('user04@gmail.com'));
            const actions = store.getActions()
            const expectedPayload = {
                payload: 'Request failed with status code 404', type: BALANCE_GET_FAIL
            }
            expect(actions[1]).toEqual(expectedPayload)
        });
    });    

    describe('addBalanceToUser action', () => {
        it('should add balance to user sucessfully if the user exists', async () => {
            mock.onPost("/transactions/addBalanceToUser").replyOnce(200, data.transactions[1]);
            await store.dispatch(addBalanceToUser('manager01@gmail.com','user02@gmail.com', 25));
            const actions = store.getActions()
            const expectedPayload = {
                payload: data.transactions[1], type: BALANCE_ADD_SUCCESS
            }
            expect(actions[1]).toEqual(expectedPayload)
        });

        it('should fail to add balance to user if the user does not exit and return an error message', async () => {
            mock.onPost("transactions/addBalanceToUser").replyOnce(404, { message: 'This user does not exists' });
            await store.dispatch(addBalanceToUser('manager01@gmail.com','user04@gmail.com', 25));
            const actions = store.getActions()
            const expectedPayload = {
                payload: 'This user does not exists', type: BALANCE_ADD_FAIL
            }
            expect(actions[1]).toEqual(expectedPayload)
        });

        it('should fail to add balance to user if the user does not exit', async () => {
            mock.onPost("transactions/addBalanceToUser").replyOnce(404, { message: '' });
            await store.dispatch(addBalanceToUser('manager01@gmail.com','user04@gmail.com', 25));
            const actions = store.getActions()
            const expectedPayload = {
                payload: 'Request failed with status code 404', type: BALANCE_ADD_FAIL
            }
            expect(actions[1]).toEqual(expectedPayload)
        });        
    });

    describe('deductBalanceToUser action', () => {
        it('should deduct a balance from user sucessfully if the user has engough credits', async () => {
            mock.onPost("/transactions/deductBalanceFromUser").replyOnce(200, data.transactions[2]);
            await store.dispatch(deductBalanceFromUser('manager01@gmail.com','user02@gmail.com', 5));
            const actions = store.getActions()
            const expectedPayload = {
                payload: data.transactions[2], type: BALANCE_DEDUCT_SUCCESS
            }
            expect(actions[1]).toEqual(expectedPayload)
        });

        it('should fail to deduct balance from a  user if the user does not have enough credits', async () => {
            mock.onPost("transactions/deductBalanceFromUser").replyOnce(406, { message: 'Required Attribute Not Satisfied' });
            await store.dispatch(deductBalanceFromUser('manager01@gmail.com','user04@gmail.com', 30));
            const actions = store.getActions()
            const expectedPayload = {
                payload: 'Required Attribute Not Satisfied', type: BALANCE_DEDUCT_FAIL
            }
            expect(actions[1]).toEqual(expectedPayload)
        });

        it('should fail to deduct balance if the user does not exists', async () => {
            mock.onPost("transactions/deductBalanceFromUser").replyOnce(404, { message: '' });
            await store.dispatch(deductBalanceFromUser('manager01@gmail.com','user04@gmail.com', 30));
            const actions = store.getActions()
            const expectedPayload = {
                payload: 'Request failed with status code 404', type: BALANCE_DEDUCT_FAIL
            }
            expect(actions[1]).toEqual(expectedPayload)
        });
    });

});