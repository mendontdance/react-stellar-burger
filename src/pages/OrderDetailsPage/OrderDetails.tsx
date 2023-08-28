import { FC } from "react";
import styles from './order-details.module.css'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderIngredientComponent } from "../../components/order-ingredient-component/OrderIngredientComponent";
import { useParams } from "react-router-dom";
import { TMessageIngredient } from "../../services/types";
import { useSelector } from "../../services/types/hooks";
import { formatDate } from "../../utils/utils";

export const OrderDetailsPage: FC<{ data: TMessageIngredient[] }> = ({ data }) => {
    const { id } = useParams();
    const ingredient = data.find((item: TMessageIngredient) => {
        return item._id === id
    })
    console.log(ingredient);
    const dataOfIngredients = useSelector((store) => store.data.data)

    const ingredients = ingredient?.ingredients.map((elem) => dataOfIngredients.filter(e => {
        if (elem === e._id) {
            return e
        }
    })).reduce((accum, element) => {
        return accum.concat(element);
    })

    const ids = ingredients?.map(({ _id }) => _id);
    const qwer = ingredients?.filter((elem, index) => {
        if (!ids?.includes(elem._id, index + 1)) {
            return elem
        }
    }).map(el => {
        return { ...el, __v: ids?.filter(element => element === el._id).length }
    })

    const list = qwer?.map((elem, index) => {
        return <OrderIngredientComponent elem={elem} key={elem._id} />
    })

    const totalPrice = ingredients?.reduce((accum, elem) => {
        return accum += elem.price
    }, 0)

    const status = ingredient?.status === 'done' ? "Выполнен" : ingredient?.status === 'created' ? 'Создан' : ingredient?.status === 'pending' ? 'Обрабатывается' : null

    const statusClassName = ingredient?.status === 'done' ? styles['status_done'] : ingredient?.status === 'created' ? styles['status_created'] : ingredient?.status === 'pending' ? styles.status_pending : styles.status_cancelled

    return (
            <section className={styles.container}>
                <h4 className={`${styles.number} text text_type_digits-default`}>{`#${ingredient?.number}`}</h4>
                <h3 className={`text text_type_main-medium ${styles.title}`}>{ingredient?.name}</h3>
                <p className={`text text_type_main-default ${statusClassName}`}>{status}</p>
                <p className={`text text_type_main-medium ${styles.subtitle}`}>Состав:</p>
                <div className={styles.content}>
                    {list}
                </div>
                <div className={styles.footer}>
                    <p className={`${styles.date} text text_type_main-default text_color_inactive`}>{formatDate(ingredient?.createdAt)}</p>
                    <div className={styles.price}>
                        <p className={`text text_type_digits-default ${styles.price__number}`}>{totalPrice}</p>
                        <div className={styles['currency-image']}><CurrencyIcon type="primary" /></div>
                    </div>
                </div>
            </section>

    )
}

{/* <img src="https://твойгород.com/wp-content/uploads/2023/06/sa-22.jpg" alt="" className={`${styles.icon_1} ${styles.icon}`} /> */ }
