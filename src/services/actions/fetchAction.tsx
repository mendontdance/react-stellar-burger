import { TCustomResponse, TResponseBody, TUser } from "../types";
export const GET_DATA_FROM_SERVER_SUCCESS: 'GET_DATA_FROM_SERVER_SUCCESS' = 'GET_DATA_FROM_SERVER_SUCCESS';
export const GET_DATA_FROM_SERVER_FAILED: 'GET_DATA_FROM_SERVER_FAILED' = 'GET_DATA_FROM_SERVER_FAILED';
export const POST_DATA_TO_SERVER_SUCCESS: 'POST_DATA_TO_SERVER_SUCCESS' = 'POST_DATA_TO_SERVER_SUCCESS';
export const POST_DATA_TO_SERVER_FAILED: 'POST_DATA_TO_SERVER_FAILED' = 'POST_DATA_TO_SERVER_FAILED';
export const POST_EMAIL_TO_SERVER_SUCCESS: 'POST_EMAIL_TO_SERVER_SUCCESS' = 'POST_EMAIL_TO_SERVER_SUCCESS';
export const POST_EMAIL_TO_SERVER_FAILED: 'POST_EMAIL_TO_SERVER_FAILED' = 'POST_EMAIL_TO_SERVER_FAILED';
export const baseUrl = 'https://norma.nomoreparties.space/api';

export function checkResponse(res: TCustomResponse): TResponseBody<TUser> {
    if (res.ok) {
        return res.json();
    }
    return res.json().then((err: any): Promise<void> => Promise.reject(err));
}

export const fetchData = () => {
    return function (dispatch: any): void {
        fetch(`${baseUrl}/ingredients`)
            .then(checkResponse)
            .then(res => {
                dispatch({
                    type: GET_DATA_FROM_SERVER_SUCCESS,
                    data: res.data
                });
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: GET_DATA_FROM_SERVER_FAILED,
                })
            })
    }
}

export const postData = (data: any, callback: () => void) => {
    return function (dispatch: any): void {
        fetch(`${baseUrl}/orders`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'authorization': localStorage?.getItem("accessToken") || ''
            },
            body: JSON.stringify({
                "ingredients": [...data],
            })
        })
            .then(checkResponse)
            .then(res => {
                dispatch({
                    type: POST_DATA_TO_SERVER_SUCCESS,
                    postData: res,
                    postSuccess: res.success
                })
                if (res.success) {
                    callback()
                }
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: POST_DATA_TO_SERVER_FAILED,
                })
            })
    }
}

