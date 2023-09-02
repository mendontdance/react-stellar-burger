import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { loginUser, LOGIN_USER, INITIAL_STATE, PASSWORD_LENGTH } from '../../services/actions/authAction';
import React, { ChangeEvent, FC, FormEvent } from 'react';
import { TLoginInfo } from '../../services/types';
import { useDispatch, useSelector } from '../../services/types/hooks';

export const LoginPage: FC = () => {

    const [valueName, setValueName] = React.useState<string>('')
    const [valueEmail, setValueEmail] = React.useState<string>('')

    const navigate = useNavigate();
    const userInfo:TLoginInfo = useSelector((store) => store.user.userLoginInfo)
    
    const handleClickRegister = (): void => {
        let path = `/register`;
        navigate(path);
    }

    const handleClickAuth = (): void => {
        let path = `/`;
        navigate(path);
    }

    const handleClickForgotPassword = (): void => {
        let path = `/forgot-password`;
        navigate(path);
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        dispatch({
            type: LOGIN_USER,
            [e.target.type]: e.target.value
        })
        if (e.target.type === 'email') {
            setValueEmail(e.target.value)
        } else {
            setValueName(e.target.value)
        }
    }

    const dispatch = useDispatch();

    const handleClickSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
<<<<<<< HEAD
        dispatch(loginUser(userInfo, handleClickAuth))
=======
        dispatch(loginUser(userInfo, handleClickAuth, () => {
            dispatch({
                type: INITIAL_STATE
            })
        }))
>>>>>>> main
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
                    value={valueEmail}
                />
                <Input
                    type='password'
                    placeholder={'Пароль'}
                    extraClass={styles.input}
                    onChange={onChange}
                    icon={"ShowIcon"}
                    value={valueName}
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
                    <span className={`${styles["register__login"]} text text_type_main-default`} onClick={handleClickForgotPassword}>Восстановить пароль</span>
                </p>
            </form>
        </main>
    );
}