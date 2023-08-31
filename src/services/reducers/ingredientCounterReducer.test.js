import { CHANGE_INGREDIENT_ORDER, COUNT_AMOUNT_OF_INGREDIENTS_ADD, COUNT_AMOUNT_OF_INGREDIENTS_DELETE, INITIAL_STATE, SET_BUN } from "../actions/ingredientCounterAction"
import { ingredientCounterReducer, initialState } from "./ingredientCounterReducer"
const data = [
    {
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
]
describe('test ingredientCounterReducer', () => {
    it('COUNT_AMOUNT_OF_INGREDIENTS_ADD', () => {
        expect(ingredientCounterReducer(initialState, ({
            type: COUNT_AMOUNT_OF_INGREDIENTS_ADD,
            data: data,
            counter: ++data.__v,
            price: data.price,
            order: ++data.order,
        }))).toEqual({
            ...initialState,
            data: [...initialState.data, data],
            counter: ++data.__v,
            sum: Number(initialState.sum) + Number(data.price),
            order: initialState.order + data.order
        })
    })
    it('COUNT_AMOUNT_OF_INGREDIENTS_DELETE', () => {
        expect(ingredientCounterReducer(initialState, ({
            type: COUNT_AMOUNT_OF_INGREDIENTS_DELETE,
            data: data,
            counter: --data.__v,
            price: data.price
        }))).toEqual({
            ...initialState,
            data: initialState.data.filter((element) => {
                if (element._newId !== data._newId) {
                    return element
                }
            }),
            counter: --data.__v,
            sum: Number(initialState.sum) - Number(data.price)
        })
    })
    it('SET_BUN', () => {
        expect(ingredientCounterReducer(initialState, ({
            type: SET_BUN,
            bun: data,
        }))).toEqual({
            ...initialState,
            bun: data
        })
    })
    it('CHANGE_INGREDIENT_ORDER', () => {
        expect(ingredientCounterReducer(initialState, ({
            type: CHANGE_INGREDIENT_ORDER,
            ingredient: data,
        }))).toEqual({
            ...initialState,
        })
    })
    it('INITIAL_STATE', () => {
        expect(ingredientCounterReducer(initialState, ({
            type: INITIAL_STATE,
        }))).toEqual({
            ...initialState,
        })
    })
})