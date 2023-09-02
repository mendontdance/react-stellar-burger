import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './appheader.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { FC } from 'react'
import { Payload } from '../payload/Payload'

export const AppHeader: FC = () => {

    const navigate = useNavigate()

    const onClick = () :void => {
        navigate('/feed')
    }

    return (
        <header className={styles.header} data-testid='header-test'>
            <div className={styles.links}>
                <Link to="/" className={`pt-4 pr-5 pb-4 pl-5 mr-2 ${styles.link} ${styles['personal-account']}`}>
                    <BurgerIcon type="primary" />
                    <p className='text text_type_main-default ml-2'>Конструктор</p>
                </Link>
                <div className={`pt-4 pr-5 pb-4 pl-5 mr-2 ${styles.link} ${styles['personal-account']}`} onClick={onClick}>
                    <ListIcon type="primary" />
                    <p className='text text_type_main-default ml-2 text_color_inactive'>Лента заказов</p>
                </div>
            </div>
            <Link to='/'><Logo /></Link>
            <div className={styles['link-account']}>
                <Link to="/profile" className={`pt-4 pr-5 pb-4 pl-5 mr-2 ${styles.link} ${styles['personal-account']}`}>
                    <ProfileIcon type="primary" />
                    <p className='text text_type_main-default ml-2 text_color_inactive'>Личный кабинет</p>
                </Link>
            </div>
        </header>
    )
}