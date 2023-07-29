import {
    GET_DATA_FROM_SERVER_SUCCESS,
    GET_DATA_FROM_SERVER_FAILED
} from '../actions/fetchAction.jsx';

const initialState = {
    dataFailed: false,
    success: false,
    data: {}
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
        default: {
            return state;
        }
    }
};