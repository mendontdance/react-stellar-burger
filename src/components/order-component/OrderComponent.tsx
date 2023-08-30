import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC } from "react";
import styles from './order-component.module.css'
import { TMessageIngredient } from "../../services/types";
import { useSelector } from "../../services/types/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/utils";

export const OrderComponent: FC<{ data: TMessageIngredient }> = ({ data }) => {

    const dataOfIngredients = useSelector((store) => store.data.data)

    const ingredients = data.ingredients.map((elem) => dataOfIngredients.filter(e => {
        if (elem === e._id) {
            return e
        }
    })).reduce((accum, element) => {
        return accum.concat(element);
    })

    const listOfIngredients = ingredients.map((elem, index) => {
        if (ingredients.length > 6 && index === 5) {
            return (
                <div className={styles.background_elem} key={elem._id}>
                    <img src={elem.image} alt={elem.name} className={`${styles.icon}`} />
                    <div className={`text text_type_digits-default ${styles.background_overlay}`}>+{ingredients.length - index}</div>
                </div>
            )
        }
        if (index > 5) return;
        return (
            <img src={elem.image_mobile} alt={elem.name} className={`${styles[`icon_${index + 1}`]} ${styles.icon}`} key={elem._id + Math.floor(Math.random() * 1000000)} />
        )
    })

    const totalPriceOfOrder = ingredients.reduce((accum, elem) => {
        return accum += elem.price
    }, 0)

    const navigate = useNavigate();

    // const onClick = (): void => {
    //     navigate(`/feed/${data._id}`)
    // }

    const status = data?.status === 'done' ? "Выполнен" : data?.status === 'created' ? 'Создан' : data?.status === 'pending' ? 'Обрабатывается' : null

    const statusClassName = data?.status === 'done' ? styles['status_done'] : data?.status === 'created' ? styles['status_created'] : data?.status === 'pending' ? styles.status_pending : styles.status_cancelled
    const [state, setState] = React.useState(false);

    let location = useLocation();
    React.useEffect(() => {
        if (location.pathname === '/orders') {
            setState(true)
        } else {
            setState(false)
        }
    }, [location])

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h4 className={`${styles.number} text text_type_digits-default`}>{data.number}</h4>
                <p className={`${styles.date} text text_type_main-default text_color_inactive`}>{`${formatDate(data.createdAt)}`}</p>
            </div>
            <h3 className={`text text_type_main-medium ${styles.title}`}>{data.name}</h3>
            {state && <p className={`${statusClassName} text text_type_main-default`}>{status}</p>}
            <div className={styles.footer}>
                <div className={styles.icons}>
                    {listOfIngredients}
                </div>
                <div className={styles.price}>
                    <p className={`text text_type_digits-default ${styles.price__number}`}>{totalPriceOfOrder}</p>
                    <div className={styles['currency-image']}><CurrencyIcon type="primary" /></div>
                </div>
            </div>
        </div>
    )
}