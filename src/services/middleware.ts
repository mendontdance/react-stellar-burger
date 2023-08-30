// socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch } from './types/hooks';
import { TApplicationActions } from './types';
import { ws_url } from './store';

type TwsActions = {
    wsInit: 'WS_CONNECTION_START' | 'WS_CONNECTION_START_PROFILE_ORDERS',
    wsSendMessage: 'WS_SEND_MESSAGE',
    onOpen: 'WS_CONNECTION_SUCCESS' | 'WS_CONNECTION_SUCCESS_PROFILE_ORDERS',
    onClose: 'WS_CONNECTION_CLOSED' | 'WS_CONNECTION_CLOSED_PROFILE_ORDERS',
    onError: 'WS_CONNECTION_ERROR' | 'WS_CONNECTION_ERROR_PROFILE_ORDERS',
    onMessage: 'WS_ON_MESSAGE_RECEIVED' | 'WS_ON_MESSAGE_RECEIVED_PROFILE_ORDERS'
  };

export const socketMiddleware = (wsActions: TwsActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch>) => {
    let socket: WebSocket | null = null;

    return next => (action) => {
      const { dispatch } = store;
      const {wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
      const {type, payload} = action
      if (type === wsInit) {
        socket = new WebSocket(`${ws_url}${payload}`);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({
            type: onOpen
          })
          console.log("Соединение установлено")
        };

        socket.onmessage = (event: MessageEvent) => {
          dispatch({
            type: onMessage, payload: JSON.parse(event.data)
          })
          console.log("Данные получены");
        };

        socket.onerror = () => {
          dispatch({
            type: onError
          })
          console.log('Соединение закрыто некорректно');
        };

        socket.onclose = () => {
          dispatch({
            type: onClose
          })
          console.log('Соединение закрыто корректно');
        };
        // if (action.type === wsSendMessage) {
        //   const message = action.payload;
        //   socket.send(JSON.stringify(message));
        // }
      }
      next(action);
    };
  }) as Middleware;
};