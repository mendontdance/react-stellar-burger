import styles from './ingredientcomposition.module.css'

export default function IngredientComposition(props) {

    const typeOfEnergyValue = props.carbohydrates ? "Углеводы, г" : props.fat ? "Жиры, г" : props.proteins ? "Белки, г" : props.calories ? "Калории, ккал" : null;

    const amountOfEnergyValue = props.carbohydrates ? props.carbohydrates : props.fat ? props.fat : props.proteins ? props.proteins : props.calories ? props.calories : null;

    return (
        <div className={`${styles.composition}`}>
            <p className="text text_type_main-default text_color_inactive">{typeOfEnergyValue}</p>
            <p className="text text_type_digits-default text_color_inactive">{amountOfEnergyValue}</p>
        </div>
    )
}