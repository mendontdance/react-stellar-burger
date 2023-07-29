import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import BurgerComponent from '../burger-component/BurgerComponent.jsx';
import Modal from '../modal/Modal.jsx';
import React from 'react'
import OrderDetails from '../order-details/OrderDetails';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';


export default function BurgerConstructor() {

    const [showModal, setShowModal] = React.useState(false);

    const dispatch = useDispatch();

    const [{ isOver }, dropRefFromBurgerIngredients] = useDrop({
        accept: 'drag from burger-ingredients',
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
        drop: (item) => {
            if (item.type !== 'bun') {
                dispatch({
                    type: 'COUNT_AMOUNT_OF_INGREDIENTS_ADD',
                    data: item,
                    counter: ++item.__v,
                    price: item.price,
                    order: ++item.order,
                })
            } else {
                setBun(item)
            }
        }
    })

    const [bun, setBun] = React.useState({
        sum: 0,
        show: true
    });

    const dataOfChosenIngredients = useSelector(store => store.counter.data)
    const sumOfIngredients = useSelector(store => store.counter.sum)
    const counter = useSelector(store => store.counter) // kek
    console.log(counter);
    const totalPrice = bun.price * 2 + sumOfIngredients > 0 ? bun.price * 2 + sumOfIngredients : "0"

    const postData = (data, number, name) => {
        fetch('https://norma.nomoreparties.space/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "number": number,
                "bun": name,
                "ingredients": [...data],
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .catch(err => console.log(err))
    }
    
    const [number, setOrderNumber] = React.useState()

    React.useEffect(() => {
        setOrderNumber(() => {
            const number = Math.floor(Math.random()*1000000);
            if(number < 100000) {
                return '0' + number;
            } else {
                return '' + number;
            }
        })
    },[OrderDetails]);

    return (
        <section className={`mt-25 ${styles['burger-constructor']}`} ref={dropRefFromBurgerIngredients} >
            <div className={styles['burger-container']}>
                {
                    !bun.show ? <div className='ml-6 mr-2 mb-2'>
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
                    !bun.show ? <div className={`${styles.ingredients}`}>
                        {
                            dataOfChosenIngredients.map((ingredient, index) =>
                                <BurgerComponent
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
                    !bun.show && <div className='ml-6 mr-2 mb-2'>
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
                <Button htmlType="button" type="primary" size="large" onClick={
                    () => {
                        postData(dataOfChosenIngredients.map(elem => {
                            return elem
                        }), number, bun.name);
                        setShowModal(true);
                        dispatch({
                            type: "INITIAL_STATE"
                        })
                        setBun({
                            sum: 0,
                            show: true
                        })
                    }
                }>
                    Оформить заказ
                </Button>
                {showModal && <Modal onClose={() => setShowModal(false)}>
                    <OrderDetails number={number}/>
                </Modal>}
            </div>
        </section>
    )
}

// import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
// import styles from './burger-constructor.module.css';
// import BurgerComponent from '../burger-component/BurgerComponent.jsx';
// import Modal from '../modal/Modal.jsx';
// import React from 'react'
// import OrderDetails from '../order-details/OrderDetails';
// import { useDispatch, useSelector } from 'react-redux';
// import { sumAction } from '../../services/actions/sumAction';
// import { useDrop } from 'react-dnd';


// export default function BurgerConstructor() {

//     // const dispatch = useDispatch();

//     const data = useSelector(store => store.data.data)
//     const [showModal, setShowModal] = React.useState(false); // Potom nado izbavit'sya


//     // const listOfIgredients = data.map((ingredient) => {
//     //     if (ingredient.type !== "bun") {
//     //         return <BurgerComponent data={ingredient} key={ingredient._id} ></BurgerComponent>
//     //     }
//     // });

//     // const getCartContents = (state) => {
//     //     dispatch({
//     //         type: 'SUM_COMPONENTS_OF_BURGER',
//     //         data: listOfIgredients,
//     //         sum: data.reduce(state, elem => {
//     //             const result = state + elem.price;
//     //             return result;
//     //         })
//     //     })
//     // }

//     // React.useEffect(
//     //     () => {
//     //       dispatch(sumAction({

//     //       }));
//     //     },
//     //     [dispatch]
//     //   );

//     const certainIngredient = data.find((ingredient) => {
//         if (ingredient.name === "Краторная булка N-200i") {
//             return ingredient
//         }
//     });
//     const dispatch = useDispatch();

//     const [{ isOver }, dropRefFromBurgerIngredients] = useDrop({
//         accept: 'drag from burger-ingredients',
//         collect: (monitor) => ({
//             isOver: monitor.isOver(),
//         }),
//         drop: (item) => {
//             if (item.type !== 'bun') {
//                 dispatch({
//                     type: 'COUNT_AMOUNT_OF_INGREDIENTS_ADD',
//                     data: item,
//                     counter: ++item.__v,
//                     price: item.price,
//                     order: ++item.order,
//                 })
//             } else {
//                 setBun(item)
//             }
//         }
//     })

//     // const [{ changingPlace }, dropRefInsideBurgerConstructor] = useDrop({
//     //     accept: 'drag inside burger-constructor',
//     //     collect: (monitor) => ({
//     //         changingPlace: monitor.isOver(),
//     //     }),
//     //     drop: (item) => {
//     //         if (item.type !== 'bun') {
//     //             dispatch({
//     //                 type: 'COUNT_AMOUNT_OF_INGREDIENTS_ADD',
//     //                 data: item,
//     //                 counter: ++item.__v
//     //             })
//     //         } else {
//     //             setBun(item)
//     //         }
//     //     }
//     // })

//     const [bun, setBun] = React.useState({
//         sum: 0,
//         show: true
//     });

//     const dataOfChosenIngredients = useSelector(store => store.counter.data)
//     const sumOfIngredients = useSelector(store => store.counter.sum)
//     const counter = useSelector(store => store.counter)
//     const [ingredientList, setIngredientList] = React.useState({...dataOfChosenIngredients})
//     console.log(ingredientList);

//     console.log(dataOfChosenIngredients);
//     const totalPrice = bun.price * 2 + sumOfIngredients > 0 ? bun.price * 2 + sumOfIngredients : "0"

//     const sortIngredientList = (a, b) => {
//         if (a.order > b.order) {
//             return 1
//         } else {
//             return -1
//         }
//     }

//     const [currentIngredient, setCurrentIngredient] = React.useState(null)

//     console.log(currentIngredient);
//     function dragStartHangler(e, ingredient) {
//         e.preventDefault();
//         setCurrentIngredient(ingredient)
//     }

//     function dragEndHandler(e) {
//         e.target.style.background = "white"
//     }

//     function dragOverHandler(e) {
//         e.preventDefault()
//         e.target.style.background = "lightgray"
//     }
    
//     function dropHandler(e, ingredient) {
//         e.preventDefault()
//         setIngredientList(dataOfChosenIngredients.map(c => {
//             if(c._id === ingredient._id) {
//                 return {...c, order: currentIngredient.order}
//             }
//             if(c._id === currentIngredient._id) {
//                 return {...c, order: ingredient.order}
//             }
//             return c
//         }))
//     }

//     return (
//         <section className={`mt-25 ${styles['burger-constructor']}`} ref={dropRefFromBurgerIngredients} >
//             <div className={styles['burger-container']}>
//                 {
//                     !bun.show ? <div className='ml-6 mr-2 mb-2'>
//                         <ConstructorElement
//                             type="top"
//                             isLocked={true}
//                             text={`${bun.name} (верх)`}
//                             price={bun.price}
//                             thumbnail={bun.image_mobile}
//                             extraClass={`${styles['chosen-ingredient']}`}
//                         />
//                     </div> :
//                         <div className='ml-10 mr-2 mb-2 mt-10 text text_type_digits-default'>
//                             Выберите тип булки, который вы бы хотели
//                         </div>
//                 }
//                 {
//                     !bun.show ? <div className={`${styles.ingredients}`}>
//                         {
//                             dataOfChosenIngredients.sort(sortIngredientList).map(ingredient =>
//                                 <BurgerComponent 
//                                 data={ingredient} 
//                                 key={`${ingredient._id}`} 
//                                 draggable={true}
//                                 onDragStart={(e) => dragStartHangler(e, ingredient)}
//                                 onDragLeave={(e) => dragEndHandler(e)}
//                                 onDragEnd={(e) => dragEndHandler(e)}
//                                 onDragOver={(e) => dragOverHandler(e)}
//                                 onDrop={(e) => dropHandler(e, ingredient)} 
//                                 />
//                             )}
//                         {
//                             isOver && <div>Тащите сюда ингредиенты или поменяйте булку</div>
//                         }
//                     </div> :
//                         <div className={`mt-10 ml-10 text text_type_digits-default`}>После выбора булки выберите желаемые ингредиенты</div>
//                 }
//                 {
//                     !bun.show && <div className='ml-6 mr-2 mb-2'>
//                         <ConstructorElement
//                             type="bottom"
//                             isLocked={true}
//                             text={`${bun.name} (низ)`}
//                             price={bun.price}
//                             thumbnail={bun.image_mobile}
//                             extraClass={`${styles['chosen-ingredient']}`}
//                         />
//                     </div>
//                 }
//             </div>
//             <div className={`mt-5 ${styles.submit}`}>
//                 <div className={`text text_type_digits-medium mr-10 ${styles.counter}`}>
//                     <p className={`pr-3 ${styles.counter__number}`}>{totalPrice}</p>
//                     <div className={`${styles['currency-icon']}`}>
//                         <CurrencyIcon type="primary" />
//                     </div>
//                 </div>
//                 <Button htmlType="button" type="primary" size="large" onClick={() => setShowModal(true)}>
//                     Оформить заказ
//                 </Button>
//                 {showModal && <Modal onClose={() => setShowModal(false)}>
//                     <OrderDetails />
//                 </Modal>}
//             </div>
//         </section>
//     )
// }
