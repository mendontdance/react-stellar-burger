import {
    COUNT_AMOUNT_OF_INGREDIENTS_ADD,
    COUNT_AMOUNT_OF_INGREDIENTS_DELETE,
    CHANGE_INGREDIENT_ORDER,
    INITIAL_STATE,
    SET_BUN
} from '../actions/ingredientCounterAction';
import { TIngredient } from '../types';

export type TCounterInitialState = {
    data: TIngredient[],
    counter: number,
    sum: number,
    order: number,
    bun: TIngredient
}

export type TCountAmountOfIngredientsAdd = {
    readonly type: typeof COUNT_AMOUNT_OF_INGREDIENTS_ADD;
    readonly data: TIngredient
    readonly order: number
    readonly price: number
    readonly counter: number
}
export type TCountAmountOfIngredientsDelete = {
    readonly type: typeof COUNT_AMOUNT_OF_INGREDIENTS_DELETE;
    readonly data: TIngredient
    readonly counter: number
    readonly price: number
}
export type TChangeIngredientOrder = {
    readonly type: typeof CHANGE_INGREDIENT_ORDER;
    readonly indexFrom: number
    readonly indexTo: number
    readonly ingredient: TIngredient
}
export type TInitialStateCounter = {
    readonly type: typeof INITIAL_STATE;
}
export type TSetBun = {
    readonly type: typeof SET_BUN;
    readonly bun: TIngredient
}

export type TCounterActions =
TCountAmountOfIngredientsAdd
    | TCountAmountOfIngredientsDelete
    | TChangeIngredientOrder
    | TInitialStateCounter
    | TSetBun