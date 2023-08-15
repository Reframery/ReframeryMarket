import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import data from './testData.json';

import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { searchItems } from '../actions/searchActions';
import { ITEM_SEARCH_FAIL, ITEM_SEARCH_SUCCESS } from '../constants/searchConstants';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);

describe('Search actions testing', () => {
    var initialState;
    var store;

    beforeEach(() => {
        initialState = {};
        store = mockStore(initialState)
    });

    describe('searchItems action', () => {

        it('should return an empty list if no item matchs the filter condition', async () => {
            mock.onPost("/search/searchItems/10-1-reversed").reply(200, []);
            await store.dispatch(searchItems('cookie', 10, 1, 'reversed'));
            const actions = store.getActions()
            const expectedPayload = {
                payload: [], type: ITEM_SEARCH_SUCCESS
            }
            expect(actions[1]).toEqual(expectedPayload)
        });

        it('should return a list of itmes that their item name match the filter condition', async () => {
            mock.onPost("/search/searchItems/10-1-reversed").reply(200, data.cakes);
            await store.dispatch(searchItems('cake', 10, 1, 'reversed'));
            const actions = store.getActions()
            const expectedPayload = {
                payload: data.cakes, type: ITEM_SEARCH_SUCCESS
            }
            expect(actions[1]).toEqual(expectedPayload)
        });

        it('should fail to search when the server is down', async () => {
            mock.onPost("/search/searchItems/10-1-reversed").reply(444, {message: 'No Response'});
            await store.dispatch(searchItems('cake', 10, 1, 'reversed'));
            const actions = store.getActions()
            const expectedPayload = {
                payload: 'Request failed with status code 444', type: ITEM_SEARCH_FAIL
            }
            expect(actions[1]).toEqual(expectedPayload)
        });
    });

});