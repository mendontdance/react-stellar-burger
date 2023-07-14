import React from 'react'
import styles from './burger-ingredients.module.css'
import { TypeIngredient } from '../type-ingredient/TypeIngredient.jsx'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

export default function BurgerIngredients(props) {

    const [current, setCurrent] = React.useState('one');
    const ref1 = React.useRef(null);
    const ref2 = React.useRef(null);
    const ref3 = React.useRef(null);

    // React.useEffect(() => {
    //     ref.current.scrollIntoView();
    // }, [current]);

    return (
        <section className={`mt-10 ${styles['burger-ingredients']}`}>
            <h2 className={`text text_type_main-large ${styles.title}`}>Соберите бургер</h2>
            <div style={{ display: 'flex' }}>
                <Tab value="one" active={current === 'one'} onClick={() => {
                    ref1.current.scrollIntoView({ behavior: "smooth" })
                    setCurrent('one');
                }}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={() => {
                    ref2.current.scrollIntoView({ behavior: "smooth" })
                    setCurrent('two')
                }}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={() => {
                    ref3.current.scrollIntoView({ behavior: "smooth" })
                    setCurrent('three')
                }}>
                    Начинки
                </Tab>
            </div>
            <div className={`${styles.ingredients}`}>
                <TypeIngredient type="bun" data={props.data} ref={ref1} />
                <TypeIngredient type="sauce" data={props.data} ref={ref2} />
                <TypeIngredient type="main" data={props.data} ref={ref3} />
            </div>
        </section>
    )
}