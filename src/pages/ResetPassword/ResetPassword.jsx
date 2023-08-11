import styles from './resetpassword.module.css';
import AppHeader from '../../components/appheader/AppHeader';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { RESET_PASSWORD, resetPassword, REDIRECT_RESET_PASSWORD } from '../../services/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

export function ResetPasswordPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const resetInfo = useSelector(store => store.user.resetInfo)

    const handleClickLogin = () => {
        let path = `/login`;
        navigate(path);
    }

    const onChange = (e) => {
        dispatch({
            type: RESET_PASSWORD,
            [e.target.type]: e.target.value
        })
    }
    console.log(resetInfo);

    const onClick = () => {
        dispatch(resetPassword(resetInfo.password, resetInfo.text, handleClickLogin))
        dispatch({
            type: REDIRECT_RESET_PASSWORD,
            redirect:true
        })
    }

    const inputRefPassword = React.useRef(null);
    const inputRefToken = React.useRef(null)
    
    const onIconClick = (inputRef) => {
        setTimeout(() => inputRef.current.focus(), 0)
    }

    return (
        <>
            <AppHeader />
            <main className={`ml-5 mr-5 ${styles.main}`}>
                <form className={styles.container}>
                    <h2 className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</h2>
                    <Input
                        type='password'
                        placeholder={'Введите новый пароль'}
                        extraClass={styles.input}
                        icon={"ShowIcon"}
                        ref={inputRefPassword}
                        onChange={onChange}
                        onIconClick={() => onIconClick(inputRefPassword)}
                    />
                    <Input
                        type='text'
                        placeholder={'Введите код из письма'}
                        extraClass={styles.input}
                        ref={inputRefToken}
                    />
                    <Button extraClass={styles.button} htmlType="button" type="primary" size="large" onClick={onClick}>
                        Сохранить
                    </Button>
                    <p className={`${styles.register} text text_type_main-default text_color_inactive`}>Вспомнили пароль?<span span className={`${styles["register__login"]} text text_type_main-default`} onClick={handleClickLogin}>Войти</span></p>
                </form>
            </main>
        </>
    );
}