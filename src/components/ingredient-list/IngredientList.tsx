import React, { FC, Ref } from 'react'
import { Ingredient } from '../ingredient/Ingredient'
import styles from './ingredientlist.module.css'
import { useSelector } from '../../services/types/hooks';

export const IngredientList: FC<{ type: string }> = React.forwardRef(
    ({ type }) => {

        const data = useSelector((store) => store.data.data)
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
                <h3 id={type} className={`text text_type_main-medium ${styles.title}`} >{typeOfIgredient}</h3>
                <div className={styles.type}>
                    {listOfIgredients}
                </div>
            </div>
        )
    }
)