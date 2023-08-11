import React from 'react'
import styles from './profile.module.css'
import AppHeader from '../../components/appheader/AppHeader'
import { Input, EditIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux';
import { getUserData, logout, setUserData } from '../../services/actions/authAction';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { PROFILE_INFO, PROFILE_INFO_BACK_TO_INITIAL, INITIAL_STATE } from '../../services/actions/authAction';
import { useNavigate } from 'react-router-dom';

export function ProfilePage() {
    
    const dispatch = useDispatch();
    const state = useSelector(store => store.user.user);

    const [isDisabled, setDisabled] = React.useState({
        name: true,
        email: true,
        password: true
    })

    const [initialState, setInitialState] = React.useState(state)

    console.log(state);

    const inputRefName = React.useRef(null);
    const inputRefEmail = React.useRef(null)
    const inputRefPassword = React.useRef(null)

    const onIconClickName = () => {
        setTimeout(() => inputRefName.current.focus(), 0)
        setDisabled({ ...isDisabled, name: !isDisabled.name })
    }
    const onIconClickEmail = () => {
        setTimeout(() => inputRefEmail.current.focus(), 0)
        setDisabled({ ...isDisabled, email: !isDisabled.email })
    }
    const onIconClickPassword = () => {
        setTimeout(() => inputRefPassword.current.focus(), 0)
        setDisabled({ ...isDisabled, password: !isDisabled.password })
    }

    const onChange = (e) => {
        dispatch({
            type: PROFILE_INFO,
            [e.target.name]: e.target.value
        })
    }


    const handleClickSubmit = (e) => {
        dispatch(setUserData(state))
        dispatch({
            type: INITIAL_STATE,
        })
        setDisabled({
            name: true,
            email: true,
            password: true
        })
    }

    const handleClickCancel = (e) => {
        dispatch({
            type: PROFILE_INFO_BACK_TO_INITIAL,
            data: initialState
        })
        setDisabled({
            name: true,
            email: true,
            password: true
        })
    }

    React.useEffect(() => {
        dispatch(getUserData())
    }, [dispatch])
    
    const navigate = useNavigate();
    const logOut = () => {
        dispatch(logout())
        navigate('/')
    }


    const handleClickOrdersChain = () => {
        navigate('/orders-chain')
    }

    return (
        <>
            <AppHeader />
            <main>
                <section>
                    <div className={styles.container}>
                        <menu className={styles.menu}>
                            <ul className={styles.menu_list}>
                                <li className={`${styles.li} text text_type_main-medium`}>Профиль</li>
                                <li className={`${styles.li} text text_type_main-medium text_color_inactive`} onClick={handleClickOrdersChain}>История заказов</li>
                                <li className={`${styles.li} text text_type_main-medium text_color_inactive`} onClick={logOut}>Выход</li>
                            </ul>
                            <p className={`${styles.text} text text_type_main-small`}>В этом разделе вы можете изменить свои персональные данные</p>
                        </menu>
                        <div>
                            <Input
                                type='text'
                                placeholder={'Имя'}
                                extraClass={styles.input}
                                icon={"EditIcon"}
                                name={"name"}
                                errorText={'Ошибка'}
                                value={state.name}
                                ref={inputRefName}
                                disabled={isDisabled.name}
                                onIconClick={onIconClickName}
                                onChange={onChange}
                            />
                            <Input
                                type='e-mail'
                                placeholder={'Логин'}
                                extraClass={styles.input}
                                icon={"EditIcon"}
                                name="email"
                                errorText={'Ошибка'}
                                value={state.email}
                                ref={inputRefEmail}
                                disabled={isDisabled.email}
                                onIconClick={onIconClickEmail}
                                onChange={onChange}
                            />
                            <Input
                                type='password'
                                name="password"
                                placeholder={'Пароль'}
                                extraClass={styles.input}
                                icon={"EditIcon"}
                                errorText={'Ошибка'}
                                ref={inputRefPassword}
                                value={state.password || ""}
                                disabled={isDisabled.password}
                                onIconClick={onIconClickPassword}
                                onChange={onChange}
                            />
                            <div className={styles.button__container}>
                                <Button htmlType="button" type="secondary" size="medium" onClick={handleClickCancel}>
                                    Отмена
                                </Button>
                                <Button htmlType="submit" type="primary" size="medium" onClick={handleClickSubmit}>
                                    Сохранить
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}