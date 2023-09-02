import { WS_CONNECTION_CLOSED_PROFILE_ORDERS, WS_CONNECTION_ERROR_PROFILE_ORDERS, WS_CONNECTION_SUCCESS_PROFILE_ORDERS, WS_ON_MESSAGE_RECEIVED_PROFILE_ORDERS } from "../actions/wsProfileAction"
import { wsReducerProfile, initialState } from "./wsProfileReducer"
const messages = {
    success: true,
    orders: [],
    total: 100,
    totalToday: 100000
}

describe('test wsReducerProfile', () => {
    it('WS_CONNECTION_SUCCESS_PROFILE_ORDERS', () => {
        expect(wsReducerProfile(initialState, ({
            type: WS_CONNECTION_SUCCESS_PROFILE_ORDERS,
            wsConnected: true
        }))).toEqual({
            ...initialState,
            wsConnected: true
        })
    })
    it('WS_CONNECTION_ERROR_PROFILE_ORDERS', () => {
        expect(wsReducerProfile(initialState, ({
            type: WS_CONNECTION_ERROR_PROFILE_ORDERS,
            wsConnected: false
        }))).toEqual({
            ...initialState,
            wsConnected: false
        })
    })
    it('WS_CONNECTION_CLOSED_PROFILE_ORDERS', () => {
        expect(wsReducerProfile(initialState, ({
            type: WS_CONNECTION_CLOSED_PROFILE_ORDERS,
            wsConnected: false
        }))).toEqual({
            ...initialState,
            wsConnected: false
        })
    })
    it('WS_ON_MESSAGE_RECEIVED_PROFILE_ORDERS', () => {
        expect(wsReducerProfile(initialState, ({
            type: WS_ON_MESSAGE_RECEIVED_PROFILE_ORDERS,
            payload: messages
        }))).toEqual({
            ...initialState,
            messages: messages
        })
    })
})