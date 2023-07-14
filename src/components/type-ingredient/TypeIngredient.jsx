import React from 'react'
import Ingredient from '../ingredient/Ingredient.jsx'
import styles from './typeingredient.module.css'

export const TypeIngredient = React.forwardRef(
    (props, ref) => {

        const typeOfIgredient = props.type === 'bun' ? "Булки" : props.type === "sauce" ? "Соусы" : props.type === "main" ? "Начинки" : null;

        const listOfIgredients = props.data.map(ingredient => {
            if (props.type === ingredient.type) {
                return <Ingredient data={ingredient} key={ingredient._id} />
            }
        });

        return (
            <div className='mt-10' key={typeOfIgredient}>
                <h3 id={props.type} className={`text text_type_main-medium ${styles.title}`} ref={ref}>{typeOfIgredient}</h3>
                <div key={props.data._id} className={styles.type}>
                    {listOfIgredients}
                </div>
            </div>
        )
    }
)