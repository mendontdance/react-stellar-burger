import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react'
import styles from './order-ingredient-component.module.css'
import { TIngredient } from '../../services/types'

export const OrderIngredientComponent:FC<{ elem: TIngredient }> = ({elem}) => {
    return (
        <div className={styles.container}>
            <img src={elem.image_mobile} alt="" className={styles.image} />
            <h3 className={`${styles.title} text text_type_main-default`}>{elem.name}</h3>
            <div className={styles.price__content}>
                <p className={`${styles.amount} text text_type_digits-default`}>{elem.__v}</p>
                <p className={`${styles.multiple} text text_type_digits-default`}>x</p>
                <p className={`${styles.price} text text_type_digits-default`}>{elem.price}</p>
                <div className={styles.icon}>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}