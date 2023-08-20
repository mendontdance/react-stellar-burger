import { useNavigate } from "react-router-dom";
export const GET_DATA_FROM_SERVER_SUCCESS = 'GET_DATA_FROM_SERVER_SUCCESS';
export const GET_DATA_FROM_SERVER_FAILED = 'GET_DATA_FROM_SERVER_FAILED';
export const POST_DATA_TO_SERVER_SUCCESS = 'POST_DATA_TO_SERVER_SUCCESS';
export const POST_DATA_TO_SERVER_FAILED = 'POST_DATA_TO_SERVER_FAILED';

export const POST_EMAIL_TO_SERVER_SUCCESS = 'POST_EMAIL_TO_SERVER_SUCCESS';
export const POST_EMAIL_TO_SERVER_FAILED = 'POST_EMAIL_TO_SERVER_FAILED';
export const baseUrl = 'https://norma.nomoreparties.space/api';

export function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return res.json().then(err => Promise.reject(err));
}

export const fetchData = () => {
    return function (dispatch) {
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

export const postData = (data, callback) => {
    return function (dispatch) {
        fetch(`${baseUrl}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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

