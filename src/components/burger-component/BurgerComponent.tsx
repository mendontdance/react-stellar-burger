import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-component.module.css'
import { useDrag, useDrop } from 'react-dnd'
import { COUNT_AMOUNT_OF_INGREDIENTS_DELETE, CHANGE_INGREDIENT_ORDER } from '../../services/actions/ingredientCounterAction'
import { TIngredient } from '../../services/types'
import React, { FC } from 'react'
import { useDispatch, useSelector } from '../../services/types/hooks'

type TDragIngredient = {
    ingredient: TIngredient,
    index: number
}

type TProps = {
    data: TIngredient,
    index: number
}

export const BurgerComponent: FC<TProps> = ({ data, index }) => {

    const dataOfChosenIngredients = useSelector((store) => store.counter.data)
    const dispatch = useDispatch()

    const findIndex = (item: TIngredient): number => {
        return dataOfChosenIngredients.indexOf(item);
    };

    const [, dragRefInsideConstructor] = useDrag<TDragIngredient, unknown, unknown>({
        type: "drag inside constructor",
        item: { ingredient: data, index: index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const deleteIngredient = (): void => {
        dispatch({
            type: COUNT_AMOUNT_OF_INGREDIENTS_DELETE,
            data: data,
            counter: data.__v ? --data.__v : null,
            price: data.price
        })
    }

    const ref = React.useRef<HTMLDivElement>(null)

    const [, dropRefInsideConstructor] = useDrop<TDragIngredient, unknown, unknown>({
        accept: 'drag inside constructor',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            dispatch({
                type: CHANGE_INGREDIENT_ORDER,
                indexFrom: dragIndex,
                indexTo: hoverIndex,
                ingredient: item.ingredient
            });
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })
    dropRefInsideConstructor(dragRefInsideConstructor(ref))
    return (
        <>
            <div
                className={styles.container}
                ref={ref}
                data-testid='burger-component-test'
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
        </>
    )
}

// const [cards, setCards] = React.useState([
//     {
//       id: 1,
//       text: 'Write a cool JS library',
//     },
//     {
//       id: 2,
//       text: 'Make it generic enough',
//     },
//     {
//       id: 3,
//       text: 'Write README',
//     },
//     {
//       id: 4,
//       text: 'Create some examples',
//     },
//     {
//       id: 5,
//       text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
//     },
//     {
//       id: 6,
//       text: '???',
//     },
//     {
//       id: 7,
//       text: 'PROFIT',
//     },
//   ])

// const moveCard = React.useCallback((dragIndex, hoverIndex) => {
//     setCards((prevCards) =>
//       update(prevCards, {
//         $splice: [
//           [dragIndex, 1],
//           [hoverIndex, 0, prevCards[dragIndex]],
//         ],
//       }),
//     )
//   }, [])

//   const [{ isDragging }, drag] = useDrag({
//     type: 'asdf',
//     item: () => {
//         return { ingredient, index }
//     },
//     collect: (monitor) => ({
//         isDragging: monitor.isDragging(),
//     }),
// })

// const ref = React.useRef(null)
// const [{ handlerId }, drop] = useDrop({
//     accept: 'asdf',
//     collect(monitor) {
//         return {
//             handlerId: monitor.getHandlerId(),
//         }
//     },
//     hover(item, monitor) {
//         if (!ref.current) {
//             return
//         }
//         const dragIndex = item.index
//         const hoverIndex = index
//         // Don't replace items with themselves
//         if (dragIndex === hoverIndex) {
//             return
//         }
//         // Determine rectangle on screen
//         const hoverBoundingRect = ref.current?.getBoundingClientRect()
//         // Get vertical middle
//         const hoverMiddleY =
//             (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
//         // Determine mouse position
//         const clientOffset = monitor.getClientOffset()
//         // Get pixels to the top
//         const hoverClientY = clientOffset.y - hoverBoundingRect.top
//         // Only perform the move when the mouse has crossed half of the items height
//         // When dragging downwards, only move when the cursor is below 50%
//         // When dragging upwards, only move when the cursor is above 50%
//         // Dragging downwards
//         if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
//             return
//         }
//         // Dragging upwards
//         if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
//             return
//         }
//         // Time to actually perform the action
//         moveCard(dragIndex, hoverIndex)
//         // Note: we're mutating the monitor item here!
//         // Generally it's better to avoid mutations,
//         // but it's good here for the sake of performance
//         // to avoid expensive index searches.
//         item.index = hoverIndex
//     },
// })

// const opacity = isDragging ? 0 : 1
// drag(drop(ref))




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
