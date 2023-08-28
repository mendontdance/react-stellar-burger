import {
    OPEN_INGREDIENT_MODAL_SUCCESS,
    OPEN_INGREDIENT_MODAL_FAILED
} from '../actions/modalAction';
import { TModalInitialState, TModalActions } from '../types/modal';

export const initialState: TModalInitialState = {
    showModalOrder: false,
    showModalIngredient: false,
    data: {},
};

export const modalReducer = (state = initialState, action: TModalActions): TModalInitialState => {
    switch (action.type) {
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