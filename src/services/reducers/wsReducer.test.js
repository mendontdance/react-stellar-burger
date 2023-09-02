import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_ON_MESSAGE_RECEIVED } from "../actions/wsAction"
import { wsReducer, initialState } from "./wsReducer"

const messages = {
    success: true,
    orders: [],
    total: 100,
    totalToday: 100000
}

describe('test wsReducer', () => {
    it('WS_CONNECTION_SUCCESS', () => {
        expect(wsReducer(initialState, ({
            type: WS_CONNECTION_SUCCESS,
            wsConnected: true
        }))).toEqual({
            ...initialState,
            wsConnected: true
        })
    })
    it('WS_CONNECTION_ERROR', () => {
        expect(wsReducer(initialState, ({
            type: WS_CONNECTION_ERROR,
            wsConnected: false
        }))).toEqual({
            ...initialState,
            wsConnected: false
        })
    })
    it('WS_CONNECTION_CLOSED', () => {
        expect(wsReducer(initialState, ({
            type: WS_CONNECTION_CLOSED,
            wsConnected: false
        }))).toEqual({
            ...initialState,
            wsConnected: false
        })
    })
    it('WS_ON_MESSAGE_RECEIVED', () => {
        expect(wsReducer(initialState, ({
            type: WS_ON_MESSAGE_RECEIVED,
            payload: messages
        }))).toEqual({
            ...initialState,
            messages: [messages]
        })
    })
})