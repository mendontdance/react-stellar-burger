export const GET_DATA_FROM_SERVER_SUCCESS = 'GET_DATA_FROM_SERVER_SUCCESS';
export const GET_DATA_FROM_SERVER_FAILED = 'GET_DATA_FROM_SERVER_FAILED';
export const POST_DATA_TO_SERVER_SUCCESS = 'POST_DATA_TO_SERVER_SUCCESS';

const baseUrl = 'https://norma.nomoreparties.space/api';

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export const fetchData = () => {
    return function (dispatch) {
        fetch(`${baseUrl}/ingredients`)
            .then(checkResponse)
            .then(res => {
                if (res) {
                    dispatch({
                        type: GET_DATA_FROM_SERVER_SUCCESS,
                        data: res.data
                    });
                } else {
                    dispatch({
                        type: GET_DATA_FROM_SERVER_FAILED,
                    });
                }
            })
            .catch(err => console.log(err))
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
                if(res.success) {
                    callback()
                }
            })
    }
}

