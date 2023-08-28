import React, { FC, RefObject } from 'react'
import styles from './profile.module.css'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { getUserData, logout, setUserData } from '../../services/actions/authAction';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { PROFILE_INFO, PROFILE_INFO_BACK_TO_INITIAL, INITIAL_STATE } from '../../services/actions/authAction';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../services/reducers/rootReducer';
import { TRawUser, TUserInfo } from "../../services/types";
import { useDispatch, useSelector } from '../../services/types/hooks';

type TIsDisabled = {
    name: boolean,
    email: boolean,
    password: boolean
}

export const ProfilePage : FC = () => {

    const dispatch = useDispatch();

    const [isDisabled, setDisabled] = React.useState<TIsDisabled>({
        name: true,
        email: true,
        password: true
    })

    const user: TUserInfo = useSelector((store: RootState) => store.user.user);
    const [initialState, setInitialState] = React.useState<TRawUser>(user)

    const inputRefName = React.useRef() as RefObject<
        HTMLInputElement
    > | null;
    const inputRefEmail = React.useRef() as RefObject<
        HTMLInputElement
    > | null;
    const inputRefPassword = React.useRef() as RefObject<
        HTMLInputElement
    > | null;

    const onIconClickName = () => {
        setTimeout(() => inputRefName?.current?.focus(), 0)
        setDisabled({ ...isDisabled, name: !isDisabled.name })
    }
    const onIconClickEmail = () => {
        setTimeout(() => inputRefEmail?.current?.focus(), 0)
        setDisabled({ ...isDisabled, email: !isDisabled.email })
    }
    const onIconClickPassword = () => {
        setTimeout(() => inputRefPassword?.current?.focus(), 0)
        setDisabled({ ...isDisabled, password: !isDisabled.password })
    }

    const onChange = (e:any):void => {
        dispatch({
            type: PROFILE_INFO,
            [e.target.name]: e.target.value
        })
    }

    const handleClickSubmit = (e:any):void => {
        e.preventDefault();
        dispatch(setUserData(user));
        dispatch({
            type: INITIAL_STATE,
        })
        setDisabled({
            name: true,
            email: true,
            password: true
        })
    }

    const handleClickCancel = (e:any):void => {
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
    const logOut = ():void => {
        dispatch(logout())
        navigate('/')
    }


    const handleClickOrders = ():void => {
        navigate('/orders')
    }

    return (
        <main>
            <section>
                <div className={styles.container}>
                    <menu className={styles.menu}>
                        <ul className={styles.menu_list}>
                            <li className={`${styles.li} text text_type_main-medium`}>Профиль</li>
                            <li className={`${styles.li} text text_type_main-medium text_color_inactive`} onClick={handleClickOrders}>История заказов</li>
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
                            value={user?.name || ''}
                            ref={inputRefName}
                            disabled={isDisabled.name}
                            onIconClick={onIconClickName}
                            onChange={onChange}
                        />
                        <Input
                            type='email'
                            placeholder={'Логин'}
                            extraClass={styles.input}
                            icon={"EditIcon"}
                            name="email"
                            errorText={'Ошибка'}
                            value={user?.email || ''}
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
                            value={user.password || ""}
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
    )
}