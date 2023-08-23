import { IngredientDetails } from "../../components/ingredient-details/IngredientDetails";
import { useParams } from "react-router-dom";
import { TIngredient } from "../../services/types";
import { FC } from "react";

export const IngredientDetailsPage: FC<{ data: TIngredient[] }> = ({ data }) => {

    const { id } = useParams();
    const ingredient = data.find((item: TIngredient) => {
        return item._id === id
    })

    return (
        <IngredientDetails data={ingredient} key={ingredient?._id}></IngredientDetails>
    )
}