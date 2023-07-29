import React from 'react'
import styles from "./ingredient.module.css"
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';

export default function Ingredient({ id }) {

    const ingredient = useSelector(store => {
        return store.data.data.find(elem => {
            return elem._id === id
        })
    })

    const [, dragRefFromBurgerIngredients] = useDrag({
        type: 'drag from burger-ingredients',
        item: {
            ...ingredient,
            _id: ingredient._id,
            order: 0,
            _newId: ingredient._id + Math.floor(Math.random() * 1000000) // Генерирую новый айди
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    const [state, setState] = React.useState(false)

    React.useEffect(() => {
        if (dataOfChosenIngredients.filter((v) => (ingredient.name === v.name ? v.name : null)).length > 0) {
            setState(true)
        } else {
            setState(false)
        }
    })

    const dataOfChosenIngredients = useSelector(store => store.counter.data)

    const dispatch = useDispatch();

    const openModal = () => {
        dispatch({
            type: 'OPEN_INGREDIENT_MODAL_SUCCESS',
            showModalIngredient: true,
            data: { ...ingredient }
        })
    }

    return (
        <>
            <div className={`mt-8 ${styles.ingredient}`} onClick={() => {
                openModal()
            }} ref={dragRefFromBurgerIngredients}>
                {state && <div className={`text text_type_digits-default ${styles['ingredient-added']}`}>
                    {dataOfChosenIngredients.filter((v) => (ingredient.name === v.name ? v.name : null)).length
                    }
                </div>}
                <img src={ingredient.image} alt="Картинка ингредиента" className='image' />
                <div className={styles.currency}>
                    <p className={`pr-2 text text_type_digits-default ${styles.price}`}>{ingredient.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={`text text_type_main-default ${styles.text}`}>{ingredient.name}</p>
            </div>
        </>
    )
}

