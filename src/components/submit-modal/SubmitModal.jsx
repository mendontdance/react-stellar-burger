import styles from './submitmodal.module.css'
import closeButton from '../../images/closeButton.svg'
import done from '../../images/done.png'
import React from 'react'

export default function SubmitModal(props, key) {

    const [number, setNumber] = React.useState()

    React.useEffect(() => {
        setNumber(() => {
            const number = Math.floor(Math.random()*1000000);
            if(number < 100000) {
                return '0' + number;
            } else {
                return '' + number;
            }
        })
    },[props.SubmitModal]);

    return (
        <form className={`${styles.modal} pb-30`} key={key}>
            <button onClick={props.onClose} className={styles.button__close}><img src={closeButton} alt="Кнопка закрытия" /></button>
            <p className={`${styles.order} text text_type_digits-large pt-30`}>{number}</p>
            <p className={`${styles.name} text text_type_main-medium`}>Идентификатор заказа</p>
            <img src={done} alt="Заказ готов" className={`mt-15 mb-15`}/>
            <p className={`text text_type_main-default`}>Ваш заказ начали готовить</p>
            <p className={`text_color_inactive mt-2 text text_type_main-default`}>Дождитесь готовности на орбитальной станции</p>
        </form>
    );
}
