import {
    COUNT_AMOUNT_OF_INGREDIENTS_ADD,
    COUNT_AMOUNT_OF_INGREDIENTS_DELETE,
    CHANGE_INGREDIENT_ORDER,
    INITIAL_STATE,
    SET_BUN
} from '../actions/ingredientCounterAction';

import { TCounterInitialState, TCounterActions } from '../types/ingredientCounter'

export const initialState: TCounterInitialState = {
    data: [],
    counter: 0,
    sum: 0,
    order: 0,
    bun: {
        calories: 0,
        carbohydrates: 0,
        fat: 0,
        image: '',
        image_large: '',
        image_mobile: '',
        name: '',
        price: 0,
        proteins: 0,
        type: '',
        __v: 0,
        _id: '',
        _newId: '',
        order: 0
    }
};

export const ingredientCounterReducer = (state = initialState, action: TCounterActions): TCounterInitialState => {
    switch (action.type) {
        case COUNT_AMOUNT_OF_INGREDIENTS_ADD: {
            return {
                ...state,
                data: [...state.data, action.data],
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
                counter: action?.counter,
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
<<<<<<< HEAD
            const newData = [...state.data]
            newData.splice(action.indexFrom, 1);
            newData.splice(action.indexTo, 0, action.ingredient);
            return {
                ...state,
                data: newData
=======
            state.data.splice(action.indexFrom, 1);
            state.data.splice(action.indexTo, 0, action.ingredient);
            return {
                ...state,
>>>>>>> main
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