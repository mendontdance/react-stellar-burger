import { TMessage } from "../types";
import { WS_CONNECTION_SUCCESS_PROFILE_ORDERS, WS_CONNECTION_START_PROFILE_ORDERS, WS_CONNECTION_ERROR_PROFILE_ORDERS, WS_CONNECTION_CLOSED_PROFILE_ORDERS, WS_ON_MESSAGE_RECEIVED_PROFILE_ORDERS } from "../actions/wsProfileAction";

export type TWSConnectionStartProfileOrders = {
    readonly type: typeof WS_CONNECTION_START_PROFILE_ORDERS;
    readonly payload: string
}
export type TWSConnectionSuccessProfileOrders = {
    readonly type: typeof WS_CONNECTION_SUCCESS_PROFILE_ORDERS;
}
export type TWSConnectionErrorProfileOrders = {
    readonly type: typeof WS_CONNECTION_ERROR_PROFILE_ORDERS;
}
export type TWSConnectionClosedProfileOrders = {
    readonly type: typeof WS_CONNECTION_CLOSED_PROFILE_ORDERS;
}
export type TWSOnMessageReceivedProfileOrders = {
    readonly type: typeof WS_ON_MESSAGE_RECEIVED_PROFILE_ORDERS;
    readonly payload: TMessage
}


export type TWSActionsProfileOrders =
TWSConnectionStartProfileOrders
    | TWSConnectionSuccessProfileOrders
    | TWSConnectionErrorProfileOrders
    | TWSConnectionClosedProfileOrders
    | TWSOnMessageReceivedProfileOrders