import {
    GET_DATA_FROM_SERVER_SUCCESS,
    GET_DATA_FROM_SERVER_FAILED,
    POST_DATA_TO_SERVER_SUCCESS,
    POST_DATA_TO_SERVER_FAILED
} from '../actions/fetchAction.jsx';

const initialState = {
    dataFailed: false,
    success: false,
    data: {},
    postFailed: false,
    postSuccess: false,
    postData: [],
    orderNumber: null,
};

export const fetchReducer = (state = initialState, action) => {
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

