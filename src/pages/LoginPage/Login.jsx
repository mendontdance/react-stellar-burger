import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './login.module.css';
import AppHeader from '../../components/appheader/AppHeader';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { loginUser, LOGIN_USER, INITIAL_STATE, PASSWORD_LENGTH } from '../../services/actions/authAction';

export function LoginPage() {

    const navigate = useNavigate();
    const userInfo = useSelector(store => store.user.userLoginInfo)
    const handleClickRegister = () => {
        let path = `/register`;
        navigate(path);
    }

    const handleClickAuth = () => {
        let path = `/`;
        navigate(path);
    }

    const handleClickForgotPassword = () => {
        let path = `/forgot-password`;
        navigate(path);
    }

    const onChange = (e) => {
        dispatch({
            type: LOGIN_USER,
            [e.target.type]: e.target.value
        })
    }

    const dispatch = useDispatch();

    const handleClickSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(userInfo, handleClickAuth, () => {
            dispatch({
                type: INITIAL_STATE
            })
        }))
    }

    return (
        <main className={`ml-5 mr-5 ${styles.main}`}>
            <form className={styles.container} onSubmit={handleClickSubmit}>
                <h2 className={`text text_type_main-medium ${styles.title}`}>Вход</h2>
                <Input
                    type='email'
                    placeholder={'E-mail'}
                    extraClass={styles.input}
                    onChange={onChange}
                />
                <Input
                    type='password'
                    placeholder={'Пароль'}
                    extraClass={styles.input}
                    onChange={onChange}
                    icon={"ShowIcon"}
                />
                <Button extraClass={styles.button} htmlType="submit" type="primary" size="large">
                    Войти
                </Button>
                <p className={`${styles.register} text text_type_main-default text_color_inactive`}>
                    Вы - новый пользователь?
                    <span className={`${styles["register__login"]} text text_type_main-default`} onClick={handleClickRegister}>Зарегистрироваться</span>
                </p>
                <p className={`${styles.register} text text_type_main-default text_color_inactive`}>
                    Забыли пароль?
                    <span span className={`${styles["register__login"]} text text_type_main-default`} onClick={handleClickForgotPassword}>Восстановить пароль</span>
                </p>
            </form>
        </main>
    );
}