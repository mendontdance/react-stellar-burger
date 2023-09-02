import { FC } from 'react'
import styles from './payload.module.css';
import logo from '../../images/logo192.png'

export const Payload: FC = () => {
    return (
        <section className={styles.container}>
            <div className={styles.logo}>
                <img src={logo} alt="логотип" className={styles.logo__image} />
            </div>
        </section>
    )
}