import React from 'react'
import styles from './burger-ingredients.module.css'
import { IngredientList } from '../ingredient-list/IngredientList.jsx'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux';
import { showModalOrder } from '../../services/actions/modalAction';
import Modal from "../modal/Modal";
import IngredientDetails from '../ingredient-details/IngredientDetails.jsx'
import { useInView } from 'react-intersection-observer';
import { OPEN_INGREDIENT_MODAL_FAILED } from '../../services/actions/modalAction';


export default function BurgerIngredients() {

    const dispatch = useDispatch()

    React.useEffect(
        () => {
            dispatch(showModalOrder());
        },
        [dispatch]
    );

    const { ref: refToBun, inView: bunIsVisible } = useInView();
    const { ref: refToSauce, inView: sauceIsVisible } = useInView();
    const { ref: refToMain, inView: mainIsVisible } = useInView();

    return (
        <section className={`mt-10 ${styles['burger-ingredients']}`}>
            <h2 className={`text text_type_main-large ${styles.title}`}>Соберите бургер</h2>
            <div className={styles['burger-ingredients__container']}>
                <Tab value="one" active={bunIsVisible}>
                    Булки
                </Tab>
                <Tab value="two" active={sauceIsVisible && !bunIsVisible}>
                    Соусы
                </Tab>
                <Tab value="three" active={mainIsVisible || (!bunIsVisible && !sauceIsVisible)}>
                    Начинки
                </Tab>
            </div>
            <div className={`${styles.ingredients}`}>
                <IngredientList type="bun" ref={refToBun} />
                <IngredientList type="sauce" ref={refToSauce} />
                <IngredientList type="main" ref={refToMain} />
            </div>
        </section>
    )
}


// React.useEffect(() => {
//     ref.current.scrollIntoView();
// }, [current]);