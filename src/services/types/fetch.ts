import {
    GET_DATA_FROM_SERVER_SUCCESS,
    GET_DATA_FROM_SERVER_FAILED,
    POST_DATA_TO_SERVER_SUCCESS,
    POST_DATA_TO_SERVER_FAILED
} from '../actions/fetchAction';
import { TIngredient } from '../types';

export type TFetchInitialState = {
    data: TIngredient[],
    postData: {
        name?: string,
        order?: {
            number?: number
        },
        success: boolean
    },
    dataFailed: boolean,
    success: boolean,
    postFailed: boolean,
    postSuccess: boolean,
    orderNumber?: number,
}

export type TGetDataFromServerSuccess = {
    readonly type: typeof GET_DATA_FROM_SERVER_SUCCESS;
    readonly data: TIngredient[]
}
export type TGetDataFromServerFailed = {
    readonly type: typeof GET_DATA_FROM_SERVER_FAILED;
}
export type TPostDataToServerSuccess = {
    readonly type: typeof POST_DATA_TO_SERVER_SUCCESS;
    readonly postData: {
        name?: string | undefined,
        order?: {
            number?: number | undefined
        },
        success: boolean
    }
    readonly postSuccess: boolean
}
export type TPostDataToServerFailed = {
    readonly type: typeof POST_DATA_TO_SERVER_FAILED;
}

export type TFetchActions =
    TGetDataFromServerSuccess
    | TGetDataFromServerFailed
    | TPostDataToServerSuccess
    | TPostDataToServerFailed