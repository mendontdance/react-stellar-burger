import styles from './orderdetails.module.css'
import done from '../../images/done.png'
import { FC } from 'react';

export const OrderDetails: FC<{number: number}> = ({number}) => {
    return (
        <div className={`${styles.modal} pb-30`}>
            <p className={`${styles.order} text text_type_digits-large pt-30`}>{number}</p>
            <p className={`${styles.name} text text_type_main-medium`}>Идентификатор заказа</p>
            <img src={done} alt="Заказ готов" className={`mt-15 mb-15`}/>
            <p className={`text text_type_main-default`}>Ваш заказ начали готовить</p>
            <p className={`text_color_inactive mt-2 text text_type_main-default`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    );
}