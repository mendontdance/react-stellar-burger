import styles from './ingredientcomposition.module.css'

export default function IngredientComposition(props) {

    const a = props.carbohydrates ? "Углеводы, г" : props.fat ? "Жиры, г" : props.proteins ? "Белки, г" : props.calories ? "Калории, ккал" : null;

    const b = props.carbohydrates ? props.carbohydrates : props.fat ? props.fat : props.proteins ? props.proteins : props.calories ? props.calories : null;

    return (
        <div className={`${styles.composition}`}>
            <p className="text text_type_main-default text_color_inactive">{a}</p>
            <p className="text text_type_digits-default text_color_inactive">{b}</p>
        </div>
    )
}