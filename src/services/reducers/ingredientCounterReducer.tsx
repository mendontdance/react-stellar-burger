import {
    COUNT_AMOUNT_OF_INGREDIENTS_ADD,
    COUNT_AMOUNT_OF_INGREDIENTS_DELETE,
    CHANGE_INGREDIENT_ORDER,
    INITIAL_STATE,
    SET_BUN
} from '../actions/ingredientCounterAction';
import { TIngredient } from '../types';

export type TInitialState = {
    data: TIngredient[],
    counter: number,
    sum: number,
    order: number,
    bun: boolean
}

export const initialState: TInitialState = {
    data: [],
    counter: 0,
    sum: 0,
    order: 0,
    bun: false
};

export const ingredientCounterReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case COUNT_AMOUNT_OF_INGREDIENTS_ADD: {
            return {
                ...state,
                data: [...state.data, { ...action.data, order: Number(action.order) + Number(state.order) }],
                counter: action.counter,
                sum: Number(state.sum) + Number(action.price),
                order: state.order + action.order
            }
        }
        case COUNT_AMOUNT_OF_INGREDIENTS_DELETE: {
            return {
                ...state,
                data: state.data.filter((element) => {
                    if (element._newId !== action.data._newId) {
                        return element
                    }
                }),
                counter: action.counter,
                sum: Number(state.sum) - Number(action.price)
            }
        }
        case SET_BUN: {
            return {
                ...state,
                bun: action.bun
            }
        }
        case CHANGE_INGREDIENT_ORDER: {
            state.data.splice(action.indexFrom, 1);
            state.data.splice(action.indexTo, 0, action.ingredient);
            return {
                ...state,
            }
        }
        case INITIAL_STATE: {
            return {
                ...initialState,
            }
        }
        default: {
            return state
        }
    }
};