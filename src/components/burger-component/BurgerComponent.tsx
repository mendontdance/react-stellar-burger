import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-component.module.css'
import { useDrag, useDrop } from 'react-dnd'
import { COUNT_AMOUNT_OF_INGREDIENTS_DELETE, CHANGE_INGREDIENT_ORDER } from '../../services/actions/ingredientCounterAction'
import { TIngredient } from '../../services/types'
import { FC } from 'react'
import { useDispatch, useSelector } from '../../services/types/hooks'

type TDragIngredient = {
    ingredient: TIngredient
}

type TProps = {
    data: TIngredient, 
    index: number
}

export const BurgerComponent: FC<TProps> = ({ data, index }) => {

    const dataOfChosenIngredients = useSelector((store) => store.counter.data)
    const dispatch = useDispatch()

    const findIndex = (item: TIngredient):number => {
        return dataOfChosenIngredients.indexOf(item);
    };

    const [, dragRefInsideConstructor] = useDrag<TDragIngredient, unknown, unknown>({
        type: "drag inside constructor",
        item: { ingredient: data },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const deleteIngredient = ():void => {
        dispatch({
            type: COUNT_AMOUNT_OF_INGREDIENTS_DELETE,
            data: data,
            counter: data.__v ? --data.__v : null,
            price: data.price
        })
    }

    const [, dropRefInsideConstructor] = useDrop<TDragIngredient, unknown, unknown>({
        accept: 'drag inside constructor',
        hover: ({ ingredient }) => {
            if (ingredient._id === data._id) return;
            setTimeout(() => {
                dispatch({
                    type: CHANGE_INGREDIENT_ORDER,
                    indexFrom: findIndex(ingredient),
                    indexTo: index,
                    ingredient: ingredient
                });
            });
        }
    })

    return (
        <div
            className={styles.container}
            ref={(node) => dropRefInsideConstructor(dragRefInsideConstructor(node))}
        >
            <DragIcon type="primary" />
            <ConstructorElement
                text={data.name}
                price={data.price}
                thumbnail={data.image_mobile}
                extraClass={`chosen-ingredient`}
                handleClose={deleteIngredient}
            />
        </div>
    )
}



// const dataOfChosenIngredients = useSelector(store => store.counter.data)



// const [{ isChanging }, dragRefInsideConstructor] = useDrag({
//     type: 'drag inside constructor',
//     item: props.data,
//     collect: (monitor) => ({
//         isChanging: monitor.isDragging()
//     })
// })

// const [{ isChanged }, dropRefInsideConstructor] = useDrop({
//     accept: 'drag inside constructor',
//     collect: (monitor) => ({
//         isChanged: monitor.isOver(),
//     }),
//     drop: (item) => {
//         dispatch({
//             type: 'CHANGE_INGREDIENT_ORDER',
//             data: item,
//         })
//     }
// })

// const ref = React.useRef(null)
// const dragDropRef = dragRefInsideConstructor(dropRefInsideConstructor(ref))


// export default function BurgerComponent(props) {

//     return (
//         <div className={`${styles.component} mr-6 mt-4`}>
//             <DragIcon type="primary" />
//             <div className={`${styles['ingredient-info']} pr-8`}>
//                 <img src={props.data.image_mobile} alt="" className={`${styles.image} ml-8 mr-5`} />
//                 <p className={`${styles.title}`}>{props.data.name}</p>
//                 <div className={`ml-5 mr-5 ${styles['price-info']}`}>
//                     <p className={`text text_type_digits-default pr-2 ${styles.price}`}>{props.data.price}</p>
//                     <CurrencyIcon type="primary" />
//                 </div>
//                 <DeleteIcon type="primary" />
//             </div>
//         </div>
//     )
// }

// return (
//     <section className={`mt-25 ${styles['burger-constructor']}`}>
//         <div className={`${styles.bun}`}></div>
//         <div className={`${styles.ingredients}`}>
//             {listOfIgredients}
//         </div>
//         <div className={`${styles.bun}`}></div>
//     </section>
// )


// export default function BurgerComponent(props) {

//     return (
//         <div className={`${styles.component} mr-6 mt-4`}>
//             <DragIcon type="primary" />
//             <div className={`${styles['ingredient-info']} pr-8`}>
//                 <img src={props.data.image_mobile} alt="" className={`${styles.image} ml-8 mr-5`} />
//                 <p className={`${styles.title}`}>{props.data.name}</p>
//                 <div className={`ml-5 mr-5 ${styles['price-info']}`}>
//                     <p className={`text text_type_digits-default pr-2 ${styles.price}`}>{props.data.price}</p>
//                     <CurrencyIcon type="primary" />
//                 </div>
//                 <DeleteIcon type="primary" />
//             </div>
//         </div>
//     )
// }

// return (
//     <section className={`mt-25 ${styles['burger-constructor']}`}>
//         <div className={`${styles.bun}`}></div>
//         <div className={`${styles.ingredients}`}>
//             {listOfIgredients}
//         </div>
//         <div className={`${styles.bun}`}></div>
//     </section>
// )
