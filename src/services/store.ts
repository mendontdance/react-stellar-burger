import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/rootReducer';
import { socketMiddlewareOrders } from './middleware/middlewareOrders'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { socketMiddlewareProfile } from './middleware/middlewareProfile';

export const ws_url = 'wss://norma.nomoreparties.space/orders';

const initStore = (initialState = {}) =>
  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        thunkMiddleware,
        socketMiddlewareOrders(`${ws_url}/all`),
        socketMiddlewareProfile(ws_url)
      ),
    )
  );

export const store = initStore();
// export const store = createStore(
//     rootReducer,
//   composeWithDevTools(applyMiddleware(socketMiddleware('wss://echo.websocket.org')))
// );