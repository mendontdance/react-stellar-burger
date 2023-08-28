import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch } from '../types/hooks';
import { RootState } from '../reducers/rootReducer';
import { TWSActions } from '../types/ws';

import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_ON_MESSAGE_RECEIVED
} from '../actions/wsAction';
// socket = new WebSocket(`${wsUrl}?token=${accessToken}`);

export const socketMiddlewareOrders = (wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TWSActions) => {
      const { dispatch } = store;
      if (action.type === WS_CONNECTION_START) {
        socket = new WebSocket(wsUrl);
      }
      if (socket) {
        socket.onopen = (event: Event) => {
          dispatch({
            type: WS_CONNECTION_SUCCESS
          })
          console.log("Соединение установлено")
        };

        socket.onmessage = (event: MessageEvent) => {
          console.log(JSON.parse(event.data));
          dispatch({
            type: WS_ON_MESSAGE_RECEIVED, payload: JSON.parse(event.data)
          })
          console.log("Данные получены");
        };

        socket.onerror = (event: Event) => {
          dispatch({
            type: WS_CONNECTION_ERROR
          })
          console.log('Соединение закрыто некорректно');
        };

        socket.onclose = (event: Event) => {
          dispatch({
            type: WS_CONNECTION_CLOSED
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