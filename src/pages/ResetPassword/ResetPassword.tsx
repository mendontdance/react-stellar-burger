import styles from './resetpassword.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { RESET_PASSWORD, resetPassword, REDIRECT_RESET_PASSWORD } from '../../services/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import React, { FC, RefObject } from 'react';
import { RootState } from '../../services/reducers/rootReducer';

type TResetInfo = {
    password: string,
    text: string
}

export const ResetPasswordPage: FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const resetInfo: TResetInfo = useSelector((store: RootState) => store.user.resetInfo)

    const handleClickLogin = (): void => {
        let path = `/login`;
        navigate(path);
    }

    const onChange = (e: any): void => {
        dispatch({
            type: RESET_PASSWORD,
            [e.target.type]: e.target.value
        })
        if(e.target.type === 'password') {
            setValuePassword(e.target.value)
        } else {
            setValueText(e.target.value)
        }
    }

    const handleClickSubmit = (e: any): void => {
        e.preventDefault();
        dispatch(resetPassword(resetInfo.password, resetInfo.text, handleClickLogin))
        dispatch({
            type: REDIRECT_RESET_PASSWORD,
            redirect: true
        })
    }

    const inputRefPassword = React.useRef(null) as RefObject<
        HTMLInputElement
    > | null;;
    const inputRefToken = React.useRef(null) as RefObject<
        HTMLInputElement
    > | null;

    const onIconClick = (inputRef:RefObject<HTMLInputElement> | null) => {
        setTimeout(() => inputRef?.current?.focus(), 0)
    }

    const[valuePassword, setValuePassword] = React.useState<string>('');
    const[valueText, setValueText] = React.useState<string>('')

    return (
        <main className={`ml-5 mr-5 ${styles.main}`}>
            <form className={styles.container} onSubmit={handleClickSubmit}>
                <h2 className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</h2>
                <Input
                    type='password'
                    placeholder={'Введите новый пароль'}
                    extraClass={styles.input}
                    icon={"ShowIcon"}
                    ref={inputRefPassword}
                    onChange={onChange}
                    onIconClick={() => onIconClick(inputRefPassword)}
                    value={valuePassword}
                />
                <Input
                    type='text'
                    placeholder={'Введите код из письма'}
                    extraClass={styles.input}
                    onChange={onChange}
                    ref={inputRefToken}
                    value={valueText}
                />
                <Button extraClass={styles.button} htmlType="submit" type="primary" size="large">
                    Сохранить
                </Button>
                <p className={`${styles.register} text text_type_main-default text_color_inactive`}>Вспомнили пароль?<span className={`${styles["register__login"]} text text_type_main-default`} onClick={handleClickLogin}>Войти</span></p>
            </form>
        </main>
    );
}