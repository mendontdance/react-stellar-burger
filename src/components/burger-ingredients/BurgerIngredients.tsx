import React, { FC } from 'react'
import styles from './burger-ingredients.module.css'
import { IngredientList } from '../ingredient-list/IngredientList'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useInView } from 'react-intersection-observer';

export const BurgerIngredients: FC = () => {

    const onClick = ():void => {
        console.log(123);
    } // typescript ругался, что обязательно нужна функция onClick в Tab

    const { ref: refToBun, inView: bunIsVisible } = useInView();
    const { ref: refToSauce, inView: sauceIsVisible } = useInView();
    const { ref: refToMain, inView: mainIsVisible } = useInView();

    return (
        <section className={`mt-10 ${styles['burger-ingredients']}`}>
            <h2 className={`text text_type_main-large ${styles.title}`}>Соберите бургер</h2>
            <div className={styles['burger-ingredients__container']}>
                <Tab value="one" active={bunIsVisible} onClick={onClick}>
                    Булки
                </Tab>
                <Tab value="two" active={sauceIsVisible && !bunIsVisible} onClick={onClick}>
                    Соусы
                </Tab>
                <Tab value="three" active={mainIsVisible || (!bunIsVisible && !sauceIsVisible)} onClick={onClick}>
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