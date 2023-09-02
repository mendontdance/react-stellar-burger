import { fetchReducer, initialState } from "./fetchReducer";
import { GET_DATA_FROM_SERVER_FAILED, GET_DATA_FROM_SERVER_SUCCESS, POST_DATA_TO_SERVER_FAILED, POST_DATA_TO_SERVER_SUCCESS } from "../actions/fetchAction";

const array = [
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
        "__v": 0
    }
]

const postData = {
    name: 'name',
    order: {
        number: 123
    },
    success: true
}

describe('test fetchReducer', () => {
    it('GET_DATA_FROM_SERVER_SUCCESS', () => {
        expect(fetchReducer(initialState, ({
            type: GET_DATA_FROM_SERVER_SUCCESS,
            success: true,
            data: array
        }))).toEqual({
            ...initialState,
            success: true,
            data: [...array]
        })
        expect(fetchReducer(undefined, ({
            type: GET_DATA_FROM_SERVER_SUCCESS,
            success: true,
            data: array
        }))).toEqual({
            ...initialState,
            success: true,
            data: [...array]
        })
    })
    it('GET_DATA_FROM_SERVER_FAILED', () => {
        expect(fetchReducer(initialState, ({
            type: GET_DATA_FROM_SERVER_FAILED,
            dataFailed: true,
        }))).toEqual({
            ...initialState,
            dataFailed: true
        })
    })
    it('POST_DATA_TO_SERVER_SUCCESS', () => {
        expect(fetchReducer(initialState, ({
            type: POST_DATA_TO_SERVER_SUCCESS,
            postData: postData,
            orderNumber: postData?.order?.number,
            postSuccess: true
        }))).toEqual({
            ...initialState,
            postData: postData,
            orderNumber: postData?.order?.number,
            postSuccess: true
        })
    })
    it('POST_DATA_TO_SERVER_FAILED', () => {
        expect(fetchReducer(initialState, ({
            type: POST_DATA_TO_SERVER_FAILED,
        }))).toEqual({
            ...initialState,
        })
    })
})