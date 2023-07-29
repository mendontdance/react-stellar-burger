export const OPEN_ORDER_MODAL_SUCCESS = 'OPEN_ORDER_MODAL_SUCCESS';
export const OPEN_ORDER_MODAL_FAILED = 'OPEN_ORDER_MODAL_FAILED';

export const OPEN_INGREDIENT_MODAL_SUCCESS = 'OPEN_INGREDIENT_MODAL_SUCCESS';
export const OPEN_INGREDIENT_MODAL_FAILED = 'OPEN_INGREDIENT_MODAL_FAILED';


export const showModalOrder = () => {
    return function (dispatch) {
        dispatch({
            type: OPEN_INGREDIENT_MODAL_SUCCESS,
            showModalIngredient: true,
            data: {}
        });
        dispatch({
            type: OPEN_INGREDIENT_MODAL_FAILED,
            showModalIngredient: false,
            data: {}
        });
    }
}
