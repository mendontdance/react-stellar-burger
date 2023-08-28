import { TIngredient } from '.';
import {
    OPEN_INGREDIENT_MODAL_SUCCESS,
    OPEN_INGREDIENT_MODAL_FAILED
} from '../actions/modalAction';

export type TModalInitialState = {
    showModalOrder: boolean,
    showModalIngredient: boolean,
    data: {},
}

export type TOpenIngredientModalSuccess = {
    readonly type: typeof OPEN_INGREDIENT_MODAL_SUCCESS;
    readonly data: TIngredient
}
export type TOpenIngredientModalFailed = {
    readonly type: typeof OPEN_INGREDIENT_MODAL_FAILED;
}

export type TModalActions =
    TOpenIngredientModalSuccess
    | TOpenIngredientModalFailed