import {
    COUNT_AMOUNT_OF_INGREDIENTS_ADD,
    COUNT_AMOUNT_OF_INGREDIENTS_DELETE,
    CHANGE_INGREDIENT_ORDER,
} from '../actions/ingredientCounterAction.jsx';

export const initialState = {
    data: [],
    counter: 0,
    sum: 0,
    order: 0,
    currentIngredient: null
};

export const ingredientCounterReducer = (state = initialState, action) => {
    switch (action.type) {
        case COUNT_AMOUNT_OF_INGREDIENTS_ADD: {
            return {
                ...state,
                data: [...state.data, { ...action.data, order: Number(action.order) + Number(state.order) }],
                counter: action.counter,
                bun: action.bun,
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
        case CHANGE_INGREDIENT_ORDER: {
            state.data.splice(action.indexFrom, 1);
            state.data.splice(action.indexTo, 0, action.ingredient);
            return {
                ...state,
            }
        }
        case "INITIAL_STATE": {
            return {
                ...initialState,
            }
        }
        default: {
            return state
        }
    }
};