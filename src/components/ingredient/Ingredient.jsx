import React from 'react'
import ReactDom from 'react-dom'
import styles from "./ingredient.module.css"
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from "../modal/Modal";

export default function Ingredient(props, key) {
    const [showModal, setShowModal] = React.useState(false);

    function closeModal() {
        setShowModal(false)
    }

    function openModal() {
        setShowModal(true)
    }

    return (
        <div className={`mt-8 ${styles.ingredient}`} key={key} onClick={openModal}>
            <div className={`text text_type_digits-default ${styles['ingredient-added']}`}>1</div>
            <img src={props.data.image} alt="" className='image' />
            <div className={styles.currency}>
                <p className={`pr-2 text text_type_digits-default ${styles.price}`}>{props.data.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`text text_type_main-default ${styles.text}`}>{props.data.name}</p>
            {showModal &&
                ReactDom.createPortal(<Modal onClose={closeModal} key={props.data._id} data={props.data} />, document.body)
            }
        </div>
    )
}

