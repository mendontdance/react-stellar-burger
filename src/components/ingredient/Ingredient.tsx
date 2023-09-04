import React, { FC } from 'react'
import styles from "./ingredient.module.css"
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from 'react-dnd';
import { OPEN_INGREDIENT_MODAL_SUCCESS } from '../../services/actions/modalAction';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { TIngredient } from '../../services/types';
import { useSelector, useDispatch } from '../../services/types/hooks';

export const Ingredient: FC<{ id: string }> = ({ id }) => {

    const ingredient = useSelector((store): any => {
        return store.data.data.find((elem) => {
            return elem._id === id
        })
    })

    const location = useLocation();

    const [, dragRefFromBurgerIngredients] = useDrag<TIngredient, unknown, unknown>({
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

    const [state, setState] = React.useState<boolean>(false)

    React.useEffect(() => {
        if ([...dataOfChosenIngredients, bun].filter((v) => (ingredient?.name === v.name ? v.name : null)).length > 0) {
            setState(true)
        } else {
            setState(false)
        }
    })

    const dataOfChosenIngredients = useSelector((store) => store.counter.data)
    const bun: TIngredient = useSelector((store) => store.counter.bun)

    const dispatch = useDispatch();

    const openModal = (): void => {
        dispatch({
            type: OPEN_INGREDIENT_MODAL_SUCCESS,
            showModalIngredient: true,
            data: { ...ingredient }
        })
    }

    const navigate = useNavigate()

    function clickHandler(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault()
    }

    return (
        <span ref={dragRefFromBurgerIngredients}>
            <Link
                to={`/ingredients/${ingredient?._id}`}
                className={styles.link}
                key={ingredient?._id}
                state={{ background: location }}
            >
                <div className={`mt-8 ${styles.ingredient}`} onClick={() => {
                    openModal()
                }}  data-testid='dragIngredient'>
                    {state && <div className={`text text_type_digits-default ${styles['ingredient-added']}`}>
                        {
                            [...dataOfChosenIngredients, bun].filter((v) => (ingredient?.name === v.name ? v.name : null)).length
                        }
                    </div>}
                    <img src={ingredient?.image} alt="Картинка ингредиента" className='image' />
                    <div className={styles.currency}>
                        <p className={`pr-2 text text_type_digits-default ${styles.price}`}>{ingredient?.price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <p className={`text text_type_main-default ${styles.text}`}>{ingredient?.name}</p>
                </div>
            </Link>
        </span>
    )
}

