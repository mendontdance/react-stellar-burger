import styles from './register.module.css';
import React from 'react'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser, REGISTER_USER, INITIAL_STATE } from '../../services/actions/authAction';
import { FC } from 'react';
import { RootState } from '../../services/reducers/rootReducer';
import { TRegisteredInfo } from '../../services/types';

export const RegisterPage: FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo:TRegisteredInfo = useSelector((store: RootState) => store.user.registeredUserInfo)

    const onChange = (e: any): void => {
        dispatch({
            type: REGISTER_USER,
            [e.target.type]: e.target.value
        })
        if(e.target.type === 'email') {
            setValueEmail(e.target.value)
        } else if(e.target.type === 'text') {
            setValueName(e.target.value)
        } else {
            setValuePassword(e.target.value)
        }
    }

    const handleClickRegister = (): void => {
        let path = `/login`;
        navigate(path);
    }

    const handleClickSubmit = (e: any): void => {
        e.preventDefault();
        dispatch(registerUser(userInfo, handleClickRegister, () => {
            dispatch({
                type: INITIAL_STATE
            })
        }))
    }

    const [valueName, setValueName] = React.useState<string>('')
    const [valueEmail, setValueEmail] = React.useState<string>('')
    const [valuePassword, setValuePassword] = React.useState<string>('')

    return (
        <main className={`ml-5 mr-5 ${styles.main}`}>
            <form className={styles.container}>
                <h2 className={`text text_type_main-medium ${styles.title}`}>Регистрация</h2>
                <Input
                    type='text'
                    placeholder={'Имя'}
                    extraClass={styles.input}
                    onChange={onChange}
                    value={valueName}
                />
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
                    value={valuePassword}
                />
                <Button extraClass={styles.button} htmlType="button" type="primary" size="large" onClick={handleClickSubmit}>
                    Зарегистрироваться
                </Button>
                <p className={`${styles.register} text text_type_main-default text_color_inactive`}>Уже зарегистрированы?<span className={`${styles["register__login"]} text text_type_main-default`} onClick={handleClickRegister}>Войти</span></p>
            </form>
        </main >
    );
}