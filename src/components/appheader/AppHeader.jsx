import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './appheader.module.css'
import { Link } from 'react-router-dom'

export default function AppHeader() {

    return (
        <header className={styles.header}>
            <div className={styles.links}>
                <Link to="/" className={`pt-4 pr-5 pb-4 pl-5 mr-2 ${styles.link} ${styles['personal-account']}`} href="#">
                    <BurgerIcon type="primary" />
                    <p className='text text_type_main-default ml-2'>Конструктор</p>
                </Link>
                <a className={`pt-4 pr-5 pb-4 pl-5 mr-2 ${styles.link} ${styles['personal-account']}`} href="#">
                    <ListIcon type="primary" />
                    <p className='text text_type_main-default ml-2 text_color_inactive'>Лента заказов</p>
                </a>
            </div>
            <Link to='/'><Logo /></Link>
            <div className={styles['link-account']}>
                <Link to="/profile" className={`pt-4 pr-5 pb-4 pl-5 mr-2 ${styles.link} ${styles['personal-account']}`} href="#">
                    <ProfileIcon type="primary" />
                    <p className='text text_type_main-default ml-2 text_color_inactive'>Личный кабинет</p>
                </Link>
            </div>
        </header>
    )
}