import { FC } from 'react'
import styles from './order-board.module.css'
import { useSelector } from '../../services/types/hooks'

export const OrderBoard: FC = () => {

    const ingredients = useSelector(store => store.order.messages)

    const listOfLastOrdersDone = ingredients[ingredients.length - 1].orders.map((elem, index) => {
        if (index < 10) {
            if (elem.status === 'done') {
                return (
                    <li className={`${styles.order__item_ready} text text_type_digits-default`} key={elem._id+Math.floor(Math.random() * 1000000)}>{elem.number}</li>
                )
            }
        }
    })

    const listOfLastOrdersInProgress = ingredients[ingredients.length - 1].orders.map((elem) => {
        if (elem.status === 'pending' || elem.status === 'created') {
            return (
                <li className={`${styles['order-in-progress']} text text_type_digits-default`} key={elem._id+Math.floor(Math.random() * 1000000)}>{elem.number}</li>
            )
        }
    })

    return (
        <div className={styles.board}>
            <div className={styles.orders}>
                <div className={`${styles['order-ready']}`}>
                    <h3 className={`${styles.order__title} text text_type_main-medium`}>Готовы:</h3>
                    <ul className={`${styles.order__list}`}>
                        {listOfLastOrdersDone}
                    </ul>
                </div>
                <div className={`${styles['order-in-progress']}`}>
                    <h3 className={`${styles.order__title} text text_type_main-medium`}>В работе:</h3>
                    <ul className={`${styles.order__list}`}>
                        {listOfLastOrdersInProgress}
                    </ul>
                </div>
            </div>
            <div className={styles.order__executed}>
                <p className={`${styles.title} text text_type_main-medium`}>Выполнено за все время:</p>
                <p className={`${styles.number} text text_type_digits-large`}>{ingredients[ingredients.length - 1].total}</p>
            </div>
            <div className={styles.order__executed}>
                <p className={`${styles.title} text text_type_main-medium`}>Выполнено за сегодня:</p>
                <p className={`${styles.number} text text_type_digits-large`}>{ingredients[ingredients.length - 1].totalToday}</p>
            </div>
        </div>
    )
}