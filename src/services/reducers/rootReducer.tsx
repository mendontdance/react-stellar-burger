import { combineReducers } from 'redux';
import { fetchReducer } from './fetchReducer'
import { modalReducer } from './modalReducer'
import { ingredientCounterReducer } from './ingredientCounterReducer';
import { authReducer } from './authReducer';
import { store } from '../store';
import { wsReducer } from './wsReducer';
import { wsReducerProfile } from './wsProfileReducer';

export const rootReducer = combineReducers({
    user: authReducer,
    data: fetchReducer,
    counter: ingredientCounterReducer,
    modal: modalReducer,
    order: wsReducer,
    profile: wsReducerProfile
});

export type RootState = ReturnType<typeof store.getState>; 
