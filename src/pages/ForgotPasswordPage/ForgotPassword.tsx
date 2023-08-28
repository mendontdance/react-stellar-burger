import React from 'react';
import styles from './forgotpassword.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { FORGOT_PASSWORD, REDIRECT_RESET_PASSWORD } from '../../services/actions/authAction';
import { forgotPassword } from '../../services/actions/authAction';
import { RootState } from '../../services/reducers/rootReducer';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/types/hooks';

export const ForgotPasswordPage: FC = () => {

    let navigate = useNavigate();
    const dispatch = useDispatch();
    const email: string = useSelector((store: RootState) => store.user.email)

    const handleClickLogin = (): void => {
        let path = `/login`;
        navigate(path);
    }

    const handleClickReset = (): void => {
        let path = `/reset-password`;
        navigate(path);
    }

    const onChange = (e: any): void => {
        dispatch({
            type: FORGOT_PASSWORD,
            email: e.target.value
        })
        if(e.target.type === 'email') {
            setValue(e.target.value)
        }
    }

    const onClick = (e: any): void => {
        e.preventDefault();
        dispatch(forgotPassword(email, handleClickReset))
        dispatch({
            type: REDIRECT_RESET_PASSWORD,
            redirect: false
        })
        navigate('/reset-password')
    }

    const [value, setValue] = React.useState<string>('')

    return (
        <main className={`ml-5 mr-5 ${styles.main}`}>
            <form className={styles.container} onSubmit={onClick}>
                <h2 className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</h2>
                <Input
                    type='email'
                    placeholder={'E-mail'}
                    extraClass={styles.input}
                    onChange={onChange}
                    value={value}
                />
                <Button extraClass={styles.button} htmlType="submit" type="primary" size="large">
                    Восстановить
                </Button>
                <p className={`${styles.register} text text_type_main-default text_color_inactive`}>Вспомнили пароль?<span className={`${styles["register__login"]} text text_type_main-default`} onClick={handleClickLogin}>Войти</span></p>
            </form>
        </main>
    );
}