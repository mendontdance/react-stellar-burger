import React, { FC } from 'react'
import styles from './burger-ingredients.module.css'
import { IngredientList } from '../ingredient-list/IngredientList'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useInView } from 'react-intersection-observer';
import { useSelector } from '../../services/types/hooks';

export const BurgerIngredients: FC = () => {
    const data = useSelector(store => store.data.data)

    const [current, setCurrent] = React.useState<string>('one')

    React.useEffect(() => {
        const content: HTMLElement | null = document.getElementById('content')

        function scroll() {
            let scrollDistance = content && content.scrollTop
            if (scrollDistance === 0 && scrollDistance <= 320) {
                setCurrent('one')
            } else if (scrollDistance && (scrollDistance > 320 && scrollDistance < 870)) {
                setCurrent('two')
            } else if (scrollDistance && (scrollDistance >= 870)) {
                setCurrent('three')
            }
        }

        content && content.addEventListener('scroll', () => {
            scroll()
        })
        return () => {
            content && content.removeEventListener('scroll', scroll)
        }
    }, [data])

    return (
        <section className={`mt-10 ${styles['burger-ingredients']}`}>
            <h2 className={`text text_type_main-large ${styles.title}`}>Соберите бургер</h2>
            <div className={styles['burger-ingredients__container']}>
                <Tab value="one" active={current === 'one'} onClick={() => {
                    const content = document.querySelector('#content')
                    content?.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth"
                    })
                    setCurrent('one')
                }}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={() => {
                    const content = document.querySelector('#content')
                    content?.scrollTo({
                        top: 320,
                        left: 0,
                        behavior: "smooth"
                    })
                    setCurrent('two')
                }}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={(event) => {
                    const content = document.querySelector('#content')
                    content?.scrollTo({
                        top: 870,
                        left: 0,
                        behavior: "smooth"
                    })
                    setCurrent('three')
                }}>
                    Начинки
                </Tab>
            </div>
            <div className={`${styles.ingredients}`} id="content">
                <IngredientList type="bun" />
                <IngredientList type="sauce" />
                <IngredientList type="main" />
            </div>
        </section>
    )
}


// React.useEffect(() => {
//     ref.current.scrollIntoView();
// }, [current]);