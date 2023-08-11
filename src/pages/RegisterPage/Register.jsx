import styles from './register.module.css';
import AppHeader from '../../components/appheader/AppHeader';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser, REGISTER_USER, INITIAL_STATE } from '../../services/actions/authAction';

export function RegisterPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector(store => store.user.registeredUserInfo)

    console.log(userInfo);
    const onChange = (e) => {
        dispatch({
            type: REGISTER_USER,
            [e.target.type]: e.target.value
        })
    }

    const handleClickRegister = () => {
        let path = `/login`;
        navigate(path);
    }

    const handleClickSubmit = () => {
        dispatch(registerUser(userInfo, handleClickRegister, () => {
            dispatch({
                type: INITIAL_STATE
            })
        }))
    }

    return (
        <>
            <AppHeader />
            <main className={`ml-5 mr-5 ${styles.main}`}>
                <form className={styles.container}>
                    <h2 className={`text text_type_main-medium ${styles.title}`}>Регистрация</h2>
                    <Input
                        type='text'
                        placeholder={'Имя'}
                        extraClass={styles.input}
                        onChange={onChange}
                    />
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
                    <Button extraClass={styles.button} htmlType="button" type="primary" size="large" onClick={() => {
                        handleClickSubmit();
                    }}>
                        Зарегистрироваться
                    </Button>
                    <p className={`${styles.register} text text_type_main-default text_color_inactive`}>Уже зарегистрированы?<span span className={`${styles["register__login"]} text text_type_main-default`} onClick={handleClickRegister}>Войти</span></p>
                </form>
            </main>
        </>
    );
}