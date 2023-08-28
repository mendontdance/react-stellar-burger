import { TMessage } from "../types";
import { TWSActionsProfileOrders } from "../types/wsProfile";
import {
    WS_CONNECTION_SUCCESS_PROFILE_ORDERS,
    WS_CONNECTION_ERROR_PROFILE_ORDERS,
    WS_CONNECTION_CLOSED_PROFILE_ORDERS,
    WS_ON_MESSAGE_RECEIVED_PROFILE_ORDERS
} from "../actions/wsProfileAction";

type TWSInitialStateProfile = {
    wsConnected: boolean,
    messages: TMessage,
}

const initialState1: TWSInitialStateProfile = {
    wsConnected: false,
    messages: 
        { success: false, orders: [], total: 0, totalToday: 0 }
    ,
};

export const wsReducerProfile = (state = initialState1, action: TWSActionsProfileOrders) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS_PROFILE_ORDERS:
            return {
                ...state,
                wsConnected: true
            };

        case WS_CONNECTION_ERROR_PROFILE_ORDERS:
            return {
                ...state,
                wsConnected: false
            };

        case WS_CONNECTION_CLOSED_PROFILE_ORDERS:
            return {
                ...state,
                wsConnected: false
            };
        case WS_ON_MESSAGE_RECEIVED_PROFILE_ORDERS:
            return {
                ...state,
                messages: action.payload
            }
        default:
            return state;
    }
};