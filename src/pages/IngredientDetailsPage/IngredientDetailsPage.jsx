import IngredientDetails from "../../components/ingredient-details/IngredientDetails";
import { useParams } from "react-router-dom";

export function IngredientDetailsPage({ data }) {

    const { id } = useParams();
    const ingredient = data.find((item) => {
        return item._id === id
    })

    return (
        <>
            <IngredientDetails data={ingredient}></IngredientDetails>
        </>
    )
}