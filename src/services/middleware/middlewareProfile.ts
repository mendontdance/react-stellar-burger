import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch } from '../types/hooks';
import { RootState } from '../reducers/rootReducer';
import { WS_CONNECTION_START_PROFILE_ORDERS, WS_CONNECTION_ERROR_PROFILE_ORDERS, WS_CONNECTION_SUCCESS_PROFILE_ORDERS, WS_ON_MESSAGE_RECEIVED_PROFILE_ORDERS, WS_CONNECTION_CLOSED_PROFILE_ORDERS } from '../actions/wsProfileAction';
import { TWSActionsProfileOrders } from '../types/wsProfile';

export const socketMiddlewareProfile = (wsUrl: string): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TWSActionsProfileOrders) => {
            const { dispatch } = store;
            const accessToken = localStorage.getItem('accessToken')?.split(' ')[1]
            if (action.type === WS_CONNECTION_START_PROFILE_ORDERS) {
                socket = new WebSocket(`${wsUrl}?token=${accessToken}`)
            }
            if (socket) {
                socket.onopen = (event: Event) => {
                    dispatch({
                        type: WS_CONNECTION_SUCCESS_PROFILE_ORDERS
                    })
                    console.log("Соединение установлено")
                };

                socket.onmessage = (event: MessageEvent) => {
                    console.log(JSON.parse(event.data));
                    dispatch({
                        type: WS_ON_MESSAGE_RECEIVED_PROFILE_ORDERS, payload: JSON.parse(event.data)
                    })
                    console.log("Данные получены");
                };

                socket.onerror = (event: Event) => {
                    dispatch({
                        type: WS_CONNECTION_ERROR_PROFILE_ORDERS
                    })
                    console.log('Соединение закрыто некорректно');
                };

                socket.onclose = (event: Event) => {
                    dispatch({
                        type: WS_CONNECTION_CLOSED_PROFILE_ORDERS
                    })
                    console.log('Соединение закрыто корректно');
                };
                // if (action.type === WS_SEND_MESSAGE) {
                //   const message = action.payload;
                //   socket.send(JSON.stringify(message));
                // }
            }
            next(action);
        };
    }) as Middleware;
};