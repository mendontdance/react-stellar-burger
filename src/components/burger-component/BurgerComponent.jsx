import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-component.module.css'

export default function BurgerComponent (props) {
    return (
        <div className={styles.container} key={props.data._id}>
            <DragIcon type="primary" />
            <ConstructorElement
                key={props.data._id}
                text={props.data.name}
                price={props.data.price}
                thumbnail={props.data.image_mobile}
                extraClass={`chosen-ingredient`}
            />
        </div>
    )
}

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
