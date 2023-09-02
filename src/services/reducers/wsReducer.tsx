import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_ON_MESSAGE_RECEIVED,
    WS_ON_MESSAGE_RECEIVED_PROFILE,
} from '../actions/wsAction';
import { TMessage } from '../types';
import { TWSActions } from '../types/ws';

type TWSInitialState = {
    wsConnected: boolean,
    messages: TMessage[],
}

export const initialState: TWSInitialState = {
    wsConnected: false,
    messages: [
        { success: false, orders: [], total: 0, totalToday: 0 }
    ],
};

export const wsReducer = (state = initialState, action: TWSActions) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false
            };
        case WS_ON_MESSAGE_RECEIVED:
            return {
                ...state,
                messages: [action.payload]
            }
        default:
            return state;
    }
};