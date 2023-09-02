import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START, WS_SEND_MESSAGE, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_ON_MESSAGE_RECEIVED } from './actions/wsAction';
import { WS_CONNECTION_START_PROFILE_ORDERS, WS_CONNECTION_ERROR_PROFILE_ORDERS, WS_CONNECTION_SUCCESS_PROFILE_ORDERS, WS_ON_MESSAGE_RECEIVED_PROFILE_ORDERS, WS_CONNECTION_CLOSED_PROFILE_ORDERS } from './actions/wsProfileAction';
import { socketMiddleware } from './middleware';

export const ws_url = 'wss://norma.nomoreparties.space/orders';

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_ON_MESSAGE_RECEIVED
};

export const wsActionsProfile = {
  wsInit: WS_CONNECTION_START_PROFILE_ORDERS,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS_PROFILE_ORDERS,
  onClose: WS_CONNECTION_CLOSED_PROFILE_ORDERS,
  onError: WS_CONNECTION_ERROR_PROFILE_ORDERS,
  onMessage: WS_ON_MESSAGE_RECEIVED_PROFILE_ORDERS
};
console.log(`${ws_url}?token=${localStorage.getItem('accessToken')?.split(' ')[1]}`);

const initStore = (initialState = {}) =>
  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        thunkMiddleware,
<<<<<<< HEAD
        socketMiddleware(ws_url, wsActions),
        socketMiddleware(ws_url, wsActionsProfile)
=======
        socketMiddleware(wsActions),
        socketMiddleware(wsActionsProfile)
>>>>>>> main
      ),
    )
  );

export const store = initStore();
// export const store = createStore(
//     rootReducer,
//   composeWithDevTools(applyMiddleware(socketMiddleware('wss://echo.websocket.org')))
// );