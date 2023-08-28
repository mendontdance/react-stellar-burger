import { TIngredient, TMessage } from "../types";
import { WS_CONNECTION_SUCCESS, WS_CONNECTION_START, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_SEND_MESSAGE, WS_ON_MESSAGE_RECEIVED, WS_ON_MESSAGE_RECEIVED_PROFILE } from "../actions/wsAction";

export type TWSConnectionStart = {
    readonly type: typeof WS_CONNECTION_START;
}
export type TWSConnectionSuccess = {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}
export type TWSConnectionError = {
    readonly type: typeof WS_CONNECTION_ERROR;
}
export type TWSConnectionClosed = {
    readonly type: typeof WS_CONNECTION_CLOSED;
}
export type TWSOnMessageReceived = {
    readonly type: typeof WS_ON_MESSAGE_RECEIVED;
    readonly payload: TMessage
}
export type TWSSendMessage = {
    readonly type: typeof WS_SEND_MESSAGE
    readonly payload: TIngredient
}

export type TWSOnMessageReceivedProfile = {
    readonly type: typeof WS_ON_MESSAGE_RECEIVED_PROFILE
    readonly payload: TMessage
}

export type TWSActions =
    TWSConnectionStart
    | TWSConnectionSuccess
    | TWSConnectionError
    | TWSConnectionClosed
    | TWSOnMessageReceived
    | TWSSendMessage
    | TWSOnMessageReceivedProfile