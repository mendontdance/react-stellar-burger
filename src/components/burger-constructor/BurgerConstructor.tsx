import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { BurgerComponent } from '../burger-component/BurgerComponent';
import { Modal } from '../modal/Modal';
import React, { FC } from 'react'
import { OrderDetails } from '../order-details/OrderDetails';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { COUNT_AMOUNT_OF_INGREDIENTS_ADD, INITIAL_STATE, SET_BUN } from '../../services/actions/ingredientCounterAction'
import { postData } from '../../services/actions/fetchAction';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../services/reducers/rootReducer';
import { TIngredient } from '../../services/types';

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
                    counter: ++item.__v,
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

    const bun: TIngredient = useSelector((store: RootState) => store.counter.bun)

    const dataOfChosenIngredients: TIngredient[] = useSelector((store: RootState) => store.counter.data)
    const sumOfIngredients: number = useSelector((store: RootState) => store.counter.sum)
    const counter: any = useSelector((store: RootState) => store.counter) // kek
    console.log(counter);
    const totalPrice: number | "0" = bun.price * 2 + sumOfIngredients > 0 ? bun.price * 2 + sumOfIngredients : "0"
    const getOrderNumber: number = useSelector((store: RootState) => store.data.orderNumber)

    const isAuth: null | {} = useSelector((store: RootState) => store.user.user)

    const handleClickOrder = (): void => {
        if (isAuth) {
            dispatch(postData(dataOfChosenIngredients, () => {
                dispatch({
                    type: INITIAL_STATE
                })
                setShowModal(true);
            }))
        } else {
            navigate('/login')
        }
    }

    return (
        <section className={`mt-25 ${styles['burger-constructor']}`} ref={dropRefFromBurgerIngredients} >
            <div className={styles['burger-container']}>
                {
                    bun ? <div className='ml-6 mr-2 mb-2'>
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
                    bun ? <div className={`${styles.ingredients}`}>
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
                    bun && <div className='ml-6 mr-2 mb-2'>
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
                <Button htmlType="button" type="primary" size="large" onClick={handleClickOrder}>
                    Оформить заказ
                </Button>
                {showModal && <Modal onClose={() => setShowModal(false)}>
                    <OrderDetails number={getOrderNumber} />
                </Modal>}
            </div>
        </section>
    )
}