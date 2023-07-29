import styles from './ingredientdetails.module.css'
import IngredientComposition from '../ingredient-composition/IngredientComposition';
import { useSelector } from 'react-redux';

export default function IngredientDetails() {

    const data = useSelector(store => {
        return store.modal.data
    })

    return (
        <div className={`${styles.modal} pl-10 pt-10 pr-10 pb-15`}>
            <p className={`text text_type_main-large`}>Детали ингредиента</p>
            <img src={data.image_large} alt={data.name} />
            <p className="text text_type_main-medium mt-4">Биокотлета из марсианской Магнолии</p>
            <div className={`mt-8 ${styles.composition}`}>
                <IngredientComposition calories={data.calories} />
                <IngredientComposition proteins={data.proteins} />
                <IngredientComposition fat={data.fat} />
                <IngredientComposition carbohydrates={data.carbohydrates} />
            </div>
        </div>
    );
}
