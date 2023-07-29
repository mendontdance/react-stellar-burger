import {
    OPEN_ORDER_MODAL_SUCCESS,
    OPEN_ORDER_MODAL_FAILED,
    OPEN_INGREDIENT_MODAL_SUCCESS,
    OPEN_INGREDIENT_MODAL_FAILED
} from '../actions/modalAction.jsx';

export const initialState = {
    showModalOrder: false,
    showModalIngredient: false,
    data: {},
};

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_ORDER_MODAL_SUCCESS: {
            return {
                ...state,
                data: {...action.data},
                showModalOrder: true
            }
        }
        case OPEN_ORDER_MODAL_FAILED: {
            return {
                ...state,
                data: {},
                showModalOrder: false
            }
        }
        case OPEN_INGREDIENT_MODAL_SUCCESS: {
            return {
                ...state,
                data: {...action.data},
                showModalIngredient: true
            }
        }
        case OPEN_INGREDIENT_MODAL_FAILED: {
            return {
                ...state,
                data: {},
                showModalIngredient: false
            }
        }
        default: {
            return state
        }
    }
};