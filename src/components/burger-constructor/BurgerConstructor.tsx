import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { BurgerComponent } from '../burger-component/BurgerComponent';
import { Modal } from '../modal/Modal';
import React, { FC } from 'react'
import { OrderDetails } from '../order-details/OrderDetails';
import { useDrop } from 'react-dnd';
import { COUNT_AMOUNT_OF_INGREDIENTS_ADD, INITIAL_STATE, SET_BUN } from '../../services/actions/ingredientCounterAction'
import { postData } from '../../services/actions/fetchAction';
import { useNavigate } from 'react-router-dom';
import { TIngredient } from '../../services/types';
import { WS_SEND_MESSAGE } from '../../services/actions/wsAction';
import { useDispatch, useSelector } from '../../services/types/hooks';

type TCollectedProps = {
    isOver: boolean
}

export const BurgerConstructor: FC = () => {

    const [showModal, setShowModal] = React.useState<boolean>(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [{ isOver }, dropRefFromBurgerIngredients] = useDrop<TIngredient, unknown, TCollectedProps>({
        accept: 'drag from burger-ingredients',
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
        drop: (item) => {
            if (item.type !== 'bun') {
                dispatch({
                    type: COUNT_AMOUNT_OF_INGREDIENTS_ADD,
                    data: item,
                    counter: item.__v ? ++item.__v : null,
                    price: item.price,
                    order: ++item.order,
                })
            } else {
                dispatch({
                    type: SET_BUN,
                    bun: item
                })
            }
        }
    })

    const bun: TIngredient = useSelector((store) => store.counter.bun)
    const dataOfChosenIngredients: TIngredient[] = useSelector((store) => store.counter.data)
    const sumOfIngredients: number = useSelector((store) => store.counter.sum)
<<<<<<< HEAD

=======
    const counter = useSelector((store) => store.counter) // kek
    console.log(counter);
>>>>>>> main
    const totalPrice: number | "0" = bun.price * 2 + sumOfIngredients > 0 ? bun.price * 2 + sumOfIngredients : "0"
    const getOrderNumber: number | undefined = useSelector((store) => store.data.orderNumber)
    const isAuth = useSelector((store) => store.user.user)

    const handleClickOrder = (): void => {
        if (isAuth) {
            dispatch(postData(allOrderIngredientsId, () => {
                dispatch({
                    type: INITIAL_STATE
                })
                setShowModal(true);
                dispatch({
                    type: WS_SEND_MESSAGE,
                    payload: {message: allOrderIngredientsId}
                })
            }))
        } else {
            navigate('/login')
        }
    }

    const ingredientsId = dataOfChosenIngredients.map((elem) => elem._id)
    const allOrderIngredientsId = [bun._id, ...ingredientsId, bun._id];

    return (
<<<<<<< HEAD
        <section className={`mt-25 ${styles['burger-constructor']}`} ref={dropRefFromBurgerIngredients} data-testid='dropIngredient'>
=======
        <section className={`mt-25 ${styles['burger-constructor']}`} ref={dropRefFromBurgerIngredients} >
>>>>>>> main
            <div className={styles['burger-container']}>
                {
                    bun.type === 'bun' ? <div className='ml-6 mr-2 mb-2'>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (верх)`}
                            price={bun.price}
                            thumbnail={bun.image_mobile}
                            extraClass={`${styles['chosen-ingredient']}`}
                        />
                    </div> :
                        <div className='ml-10 mr-2 mb-2 mt-10 text text_type_digits-default'>
                            Выберите тип булки, который вы бы хотели
                        </div>
                }
                {
                    bun.type === 'bun' ? <div className={`${styles.ingredients}`}>
                        {
                            dataOfChosenIngredients.map((ingredient, index) =>
                                <BurgerComponent
                                    key={ingredient._newId}
                                    data={ingredient}
                                    index={index}
                                />
                            )}
                        {
                            isOver && <div>Тащите сюда ингредиенты или поменяйте булку</div>
                        }
                    </div> :
                        <div className={`mt-10 ml-10 text text_type_digits-default`}>После выбора булки выберите желаемые ингредиенты</div>
                }
                {
                    bun.type === 'bun' && <div className='ml-6 mr-2 mb-2'>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${bun.name} (низ)`}
                            price={bun.price}
                            thumbnail={bun.image_mobile}
                            extraClass={`${styles['chosen-ingredient']}`}
                        />
                    </div>
                }
            </div>
            <div className={`mt-5 ${styles.submit}`}>
                <div className={`text text_type_digits-medium mr-10 ${styles.counter}`}>
                    <p className={`pr-3 ${styles.counter__number}`}>{totalPrice}</p>
                    <div className={`${styles['currency-icon']}`}>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
<<<<<<< HEAD
                <Button htmlType="button" type="primary" size="large" onClick={handleClickOrder} data-testid="buttonOrder">
=======
                <Button htmlType="button" type="primary" size="large" onClick={handleClickOrder}>
>>>>>>> main
                    Оформить заказ
                </Button>
                {showModal && <Modal onClose={() => setShowModal(false)}>
                    <OrderDetails number={getOrderNumber} />
                </Modal>}
            </div>
        </section>
    )
}