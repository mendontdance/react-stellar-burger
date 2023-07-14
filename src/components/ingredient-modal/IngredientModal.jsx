import React from 'react'
import styles from './ingredientmodal.module.css'
import closeButton from '../../images/closeButton.svg'
import IngredientComposition from '../ingredient-composition/IngredientComposition';

export default function IngredientModal(props, key) {

    React.useEffect(() => {
        const buttonClose = document.querySelector(`.${styles.button__close}`);

        if (buttonClose) {
            buttonClose.addEventListener('mousedown', props.onClose);
        } else {
            return () => {
                buttonClose.removeEventListener('mousedown', props.onClose);
            };
        }
    }, [props.onClose])

    return (
        <div className={`${styles.modal} pl-10 pt-10 pr-10 pb-15`} key={key}>
            <button type="button" className={styles.button__close}><img src={closeButton} alt="Кнопка закрытия" /></button>
            <p className={`text text_type_main-large`}>Детали ингредиента</p>
            <img src={props.data.image_large} alt="" />
            <p className="text text_type_main-medium mt-4">Биокотлета из марсианской Магнолии</p>
            <div className={`mt-8 ${styles.composition}`}>
                <IngredientComposition calories={props.data.calories} />
                <IngredientComposition proteins={props.data.proteins} />
                <IngredientComposition fat={props.data.fat} />
                <IngredientComposition carbohydrates={props.data.carbohydrates} />
            </div>
        </div>
    );
}
