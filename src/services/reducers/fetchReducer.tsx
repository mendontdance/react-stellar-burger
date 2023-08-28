import {
    GET_DATA_FROM_SERVER_SUCCESS,
    GET_DATA_FROM_SERVER_FAILED,
    POST_DATA_TO_SERVER_SUCCESS,
    POST_DATA_TO_SERVER_FAILED
} from '../actions/fetchAction';
import { TFetchInitialState, TFetchActions } from '../types/fetch';


const initialState: TFetchInitialState = {
    dataFailed: false,
    data: [],
    success: false,
    postFailed: false,
    postSuccess: false,
    postData: {
        name: '',
        order: {
            number: undefined
        },
        success: false
    },
    orderNumber: undefined
};

export const fetchReducer = (state = initialState, action: TFetchActions):TFetchInitialState => {
    switch (action.type) {
        case GET_DATA_FROM_SERVER_SUCCESS: {
            return {
                ...state,
                success: true,
                data: [...action.data]
            }
        }
        case GET_DATA_FROM_SERVER_FAILED: {
            return {
                ...state,
                dataFailed: true,
            }
        }
        case POST_DATA_TO_SERVER_SUCCESS: {
            return {
                ...state,
                postData: action.postData,
                orderNumber: action.postData.order.number,
                postSuccess: action.postSuccess
            }
        }
        case POST_DATA_TO_SERVER_FAILED: {
            return {
                ...state
            }
        }
        default: {
            return state;
        }
    }
};

