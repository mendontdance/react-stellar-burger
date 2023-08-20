import styles from './forgotpassword.module.css';
import AppHeader from '../../components/appheader/AppHeader';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { FORGOT_PASSWORD, REDIRECT_RESET_PASSWORD } from '../../services/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../services/actions/authAction';
import { Link } from 'react-router-dom';

export function ForgotPasswordPage() {

    let navigate = useNavigate();
    const dispatch = useDispatch();
    const email = useSelector(store => store.user.email)

    const handleClickLogin = () => {
        let path = `/login`;
        navigate(path);
    }

    const handleClickReset = () => {
        let path = `/reset-password`;
        navigate(path);
    }

    const onChange = (e) => {
        dispatch({
            type: FORGOT_PASSWORD,
            email: e.target.value
        })
    }

    const onClick = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email, handleClickReset))
        dispatch({
            type: REDIRECT_RESET_PASSWORD,
            redirect: false
        })
        navigate('/reset-password')
    }

    return (
        <main className={`ml-5 mr-5 ${styles.main}`}>
            <form className={styles.container} onSubmit={onClick}>
                <h2 className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</h2>
                <Input
                    type='email'
                    placeholder={'E-mail'}
                    extraClass={styles.input}
                    onChange={onChange}
                />
                <Button extraClass={styles.button} htmlType="submit" type="primary" size="large">
                    Восстановить
                </Button>
                <p className={`${styles.register} text text_type_main-default text_color_inactive`}>Вспомнили пароль?<span span className={`${styles["register__login"]} text text_type_main-default`} onClick={handleClickLogin}>Войти</span></p>
            </form>
        </main>
    );
}