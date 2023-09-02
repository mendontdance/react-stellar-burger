import { FC } from 'react'
import styles from './orderschain.module.css'
import { OrderComponent } from '../../components/order-component/OrderComponent'
import { OrderBoard } from '../../components/order-board/OrderBoard'
import { useSelector, useDispatch } from '../../services/types/hooks'
import React from 'react'
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/actions/wsAction'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Payload } from '../../components/payload/Payload'

export const OrdersChainPage: FC = () => {

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch({
            type: WS_CONNECTION_START,
            payload: '/all'
        })
        return () => {
            dispatch({
                type: WS_CONNECTION_CLOSED
            });
        };
    }, [dispatch])

    const listOfMessages = useSelector(store => store.order.messages)

    const location = useLocation();

    const listOfOrders = listOfMessages[listOfMessages.length - 1]?.orders.map((elem) => {
        return (
            <Link
                to={`/feed/${elem?._id}`}
                className={styles.link}
                key={elem?._id}
                state={{ feed: location }}
            >
                <OrderComponent key={elem._id} data={elem} />
            </Link>
        )
    })

    React.useEffect(() => {
        if (listOfMessages[listOfMessages.length - 1]?.orders.length > 0) {
            setState(true)
        }
    }, [listOfMessages])

    const [state, setState] = React.useState<boolean>(false);

    return (
        <>
            {state ? <main className={`mt-10 ml-5 mr-5 ${styles.main}`}>
                <section className={styles.container}>
                    <h2 className={`text text_type_main-large mb-5 ${styles.title}`}>Лента заказов</h2>
                    <div className={styles.content}>
                        <div className={styles.orders}>
                            {listOfOrders}
                        </div>
                        <OrderBoard />
                    </div>
                </section>
            </main> : <Payload />}
        </>
    )
}