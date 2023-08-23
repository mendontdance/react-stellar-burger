import styles from './ingredientdetails.module.css'
import { IngredientComposition } from '../ingredient-composition/IngredientComposition';
import { TIngredient } from '../../services/types';
import { FC } from 'react';

type TIngredientDetails = {
    data?: TIngredient
}

export const IngredientDetails: FC<TIngredientDetails> = ({ data }) => {
    return (
        <div className={`pl-10 pt-10 pr-10 pb-15`}>
            <p className={`text text_type_main-large ${styles.title}`}>Детали ингредиента</p>
            <img src={data?.image_large} alt={data?.name} />
            <p className={`${styles.subtitle} text text_type_main-medium mt-4`}>{data?.name}</p>
            <div className={`mt-8 ${styles.composition}`}>
                <IngredientComposition calories={data?.calories} />
                <IngredientComposition proteins={data?.proteins} />
                <IngredientComposition fat={data?.fat} />
                <IngredientComposition carbohydrates={data?.carbohydrates} />
            </div>
        </div>
    );
}
