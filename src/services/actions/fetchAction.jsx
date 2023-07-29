export const GET_DATA_FROM_SERVER_SUCCESS = 'GET_DATA_FROM_SERVER_SUCCESS';
export const GET_DATA_FROM_SERVER_FAILED = 'GET_DATA_FROM_SERVER_FAILED';

export const fetchData = () => {
    return function (dispatch) {
        fetch('https://norma.nomoreparties.space/api/ingredients')
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
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

