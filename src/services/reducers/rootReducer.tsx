import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { fetchReducer } from './fetchReducer'
import { modalReducer } from './modalReducer'
import { ingredientCounterReducer } from './ingredientCounterReducer';
import { authReducer } from './authReducer';

const rootReducer = combineReducers({
    user: authReducer,
    data: fetchReducer,
    counter: ingredientCounterReducer,
    modal: modalReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));