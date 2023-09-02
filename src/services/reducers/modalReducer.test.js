import { OPEN_INGREDIENT_MODAL_FAILED, OPEN_INGREDIENT_MODAL_SUCCESS } from "../actions/modalAction"
import { modalReducer, initialState } from "./modalReducer"
const data = {
    "_id": "60666c42cc7b410027a1a9b1",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v": 0,
    'order': 0
}

describe('test modalReducer', () => {
    it('OPEN_INGREDIENT_MODAL_SUCCESS', () => {
        expect(modalReducer(initialState, ({
            type: OPEN_INGREDIENT_MODAL_SUCCESS,
            showModalIngredient: true,
            data: { ...data }
        }))).toEqual({
            ...initialState,
            data: {...data},
            showModalIngredient: true
        })
    })
    it('OPEN_INGREDIENT_MODAL_FAILED', () => {
        expect(modalReducer(initialState, ({
            type: OPEN_INGREDIENT_MODAL_FAILED,
            data: {},
            showModalIngredient: false
        }))).toEqual({
            ...initialState,
            data: {},
            showModalIngredient: false
        })
    })
})