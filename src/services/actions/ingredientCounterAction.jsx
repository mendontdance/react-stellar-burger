export const COUNT_AMOUNT_OF_INGREDIENTS_ADD = 'COUNT_AMOUNT_OF_INGREDIENTS_ADD';
export const COUNT_AMOUNT_OF_INGREDIENTS_DELETE = 'COUNT_AMOUNT_OF_INGREDIENTS_DELETE';
export const CHANGE_INGREDIENT_ORDER = 'CHANGE_INGREDIENT_ORDER';

export const ingredientCounterAction = () => {
    return function (dispatch) {
        dispatch({
            type: COUNT_AMOUNT_OF_INGREDIENTS_ADD,
        });
        dispatch({
            type: COUNT_AMOUNT_OF_INGREDIENTS_DELETE,
        });
        dispatch({
            type: CHANGE_INGREDIENT_ORDER,
        }); 
    }
}
