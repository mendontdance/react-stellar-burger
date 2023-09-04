import { FC } from "react";
import styles from './ordershistory.module.css';
import { useDispatch, useSelector } from "../../services/types/hooks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../services/actions/authAction";
import { OrderComponent } from "../../components/order-component/OrderComponent";
import React from "react";
import { WS_CONNECTION_START_PROFILE_ORDERS, WS_CONNECTION_CLOSED_PROFILE_ORDERS } from "../../services/actions/wsProfileAction";
import { Payload } from "../../components/payload/Payload";

export const OrdersHistoryPage: FC = () => {

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch({
            type: WS_CONNECTION_START_PROFILE_ORDERS,
            payload: `?token=${localStorage.getItem('accessToken')?.split(' ')[1]}`
        })
        return () => {
            dispatch({
                type: WS_CONNECTION_CLOSED_PROFILE_ORDERS
            });
        };
    }, [dispatch]);

    const navigate = useNavigate();
    const logOut = (): void => {
        dispatch(logout())
        navigate('/')
    }

    const handleClickProfile = (): void => {
        navigate('/profile')
    }

    const handleClickOrders = (): void => {
        navigate('/orders')
    }

    const location = useLocation();
    const listOfMessagesProfile = useSelector(store => store.profile)
    const listOfOrders = listOfMessagesProfile.messages.orders ? listOfMessagesProfile.messages.orders.map((elem) => {
        return (
            <Link
                to={`/orders/${elem?._id}`}
                className={styles.link}
                key={elem?._id}
                state={{ profile: location }}
            >
                <OrderComponent key={elem._id} data={elem} />
            </Link>
        )
    }).reverse() : null

    React.useEffect(() => {
        if (listOfMessagesProfile) {
            setState(true)
        }
    }, [listOfMessagesProfile])

    const [state, setState] = React.useState<boolean>(false);

    return (
        <main>
            {
                state ?
                    <>
                        <section className={styles.container}>
                            <menu className={styles.menu}>
                                <ul className={styles.menu_list}>
                                    <li className={`${styles.li} text text_type_main-medium text_color_inactive`} onClick={handleClickProfile}>Профиль</li>
                                    <li className={`${styles.li} text text_type_main-medium`} onClick={handleClickOrders}>История заказов</li>
                                    <li className={`${styles.li} text text_type_main-medium text_color_inactive`} onClick={logOut}>Выход</li>
                                </ul>
                                <p className={`${styles.text} text text_type_main-small`}>В этом разделе вы можете просмотреть свою историю заказов</p>
                            </menu>
                            <div className={styles.orders}>
                                {listOfOrders}
                            </div>
                        </section>
                    </>
                    : <Payload />
            }
        </main>
    )
}