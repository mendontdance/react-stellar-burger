import React from 'react'
import Ingredient from '../ingredient/Ingredient.jsx'
import styles from './ingredientlist.module.css'
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';


export const IngredientList = React.forwardRef(
    ({ type }, ref) => {

        const data = useSelector(store => store.data.data)

        const typeOfIgredient = type === 'bun' ? "Булки" : type === "sauce" ? "Соусы" : type === "main" ? "Начинки" : null;

        const listOfIgredients = data.map(ingredient => {
            if (type === ingredient.type) {
                return (
                    <Ingredient key={ingredient._id} id={ingredient._id} />
                )
            }
        });

        return (
            <div className={`${styles.ingredient__type} mt-10`} key={typeOfIgredient}>
                <h3 id={type} className={`text text_type_main-medium ${styles.title}`} ref={ref}>{typeOfIgredient}</h3>
                <div className={styles.type}>
                    {listOfIgredients}
                </div>
            </div>
        )
    }
)

IngredientList.propTypes ={
    type: PropTypes.string
}
