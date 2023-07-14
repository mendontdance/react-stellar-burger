import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import BurgerComponent from '../burger-component/BurgerComponent.jsx';
import Modal from '../modal/Modal.jsx';
import React from 'react'
import ReactDOM from "react-dom";

export default function BurgerConstructor({ ...props }) {

    const [showModal, setShowModal] = React.useState(false);

    const listOfIgredients = props.data.map((ingredient) => {
        if (ingredient.type !== "bun") {
            return <BurgerComponent data={ingredient} key={ingredient._id} ></BurgerComponent>
        }
    });

    const certainIngredient = props.data.find((ingredient) => {
        if (ingredient.name === "Краторная булка N-200i") {
            return ingredient
        }
    });

    return (
        <section className={`mt-25 ${styles['burger-constructor']}`}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={certainIngredient.name}
                    price={certainIngredient.price}
                    thumbnail={certainIngredient.image_mobile}
                    extraClass={`ml-6 chosen-ingredient`}
                />
                <div className={`${styles.ingredients}`} >
                    {listOfIgredients}
                </div>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={certainIngredient.name}
                    price={certainIngredient.price}
                    thumbnail={certainIngredient.image_mobile}
                    extraClass={`ml-6 chosen-ingredient`}
                />
            </div>
            <div className={`mt-5 ${styles.submit}`}>
                <div className={`text text_type_digits-medium mr-10 ${styles.counter}`}>
                    <p style={{ margin: 0 }} className='pr-3'>123</p>
                    <div className={`${styles['currency-icon']}`}>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={() => setShowModal(true)}>
                    Оформить заказ
                </Button>
                {showModal && ReactDOM.createPortal(
                    <Modal onClose={() => setShowModal(false)} modalSubmit={true} />,
                    document.body
                )}
            </div>
        </section>
    )
}