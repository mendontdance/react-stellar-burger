import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './appheader.module.css'

export default function AppHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.links}>
                <a className={`pt-4 pr-5 pb-4 pl-5 mr-2 ${styles.link} ${styles['personal-account']}`} href="#">
                    <BurgerIcon type="primary" />
                    <p className='text text_type_main-default ml-2'>Конструктор</p>
                </a>
                <a className={`pt-4 pr-5 pb-4 pl-5 mr-2 ${styles.link} ${styles['personal-account']}`} href="#">
                    <ListIcon type="primary" />
                    <p className='text text_type_main-default ml-2 text_color_inactive'>Лента заказов</p>
                </a>
            </div>
            <Logo />
            <div className={styles['link-account']}>
                <a className={`pt-4 pr-5 pb-4 pl-5 mr-2 ${styles.link} ${styles['personal-account']}`} href="#">
                <ProfileIcon type="primary" />                
                   <p className='text text_type_main-default ml-2 text_color_inactive'>Личный кабинет</p>
                </a>
            </div>
        </header>
    )
}