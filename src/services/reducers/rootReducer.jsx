import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { fetchReducer } from './fetchReducer'
import { modalReducer } from './modalReducer'
import { ingredientCounterReducer } from './ingredientCounterReducer';

const rootReducer = combineReducers({
    data: fetchReducer,
    modal: modalReducer,
    counter: ingredientCounterReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));