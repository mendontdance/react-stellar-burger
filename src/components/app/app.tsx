import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import React, { FC } from 'react'
import { fetchData } from '../../services/actions/fetchAction';
import { HomePage, ForgotPasswordPage, IngredientDetailsPage, LoginPage, OrdersChainPage, ProfilePage, RegisterPage, ResetPasswordPage, OrdersHistoryPage, OrderDetailsPage } from '../../pages';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/ProtectedRoute';
import { checkUserAuth } from '../../services/actions/authAction';
import { Modal } from '../modal/Modal';
import { OPEN_INGREDIENT_MODAL_FAILED } from '../../services/actions/modalAction';
import { AppHeader } from '../appheader/AppHeader';
import styles from './app.module.css'
import { useDispatch, useSelector } from '../../services/types/hooks';

export const App: FC = () => {

  const dispatch = useDispatch();
  const success: boolean = useSelector((store) => store.data.success);
  const data = useSelector((store) => store.data.data)
  const orders = useSelector((store) => store.order.messages)

  React.useEffect(
    () => {
      dispatch(fetchData());
    },
    [dispatch]
  );

  React.useEffect(
    (): void => {
      dispatch(checkUserAuth());
    },
    []
  );

  const closeModal = (state: boolean): void => {
    dispatch({
      type: OPEN_INGREDIENT_MODAL_FAILED,
      showModalIngredient: state,
      data: {}
    })
  }

  const location = useLocation();
  const background:string = location.state && location.state.background;
  const feed:string = location.state && location.state.feed;
  const profile:string = location.state && location.state.profile

  const redirect: boolean = useSelector((store) => store.user.redirect)
  const navigate = useNavigate()

  React.useEffect((): void => {
    if (redirect && location.pathname === '/reset-password') {
      navigate('/login')
    }
  }, [redirect])

  const onCloseIngredientModal = (): void => {
    closeModal(false)
    navigate('/')
  }

  const onCloseOrderModal = () => {
    closeModal(false)
    navigate(location.state.feed)
  }

  const onCloseOrderProfileModal = () => {
    closeModal(false)
    navigate(location.state.profile)
  }
  const profileOrder = useSelector(store => store.profile)

  return (
    <>
      {success &&
        <DndProvider backend={HTML5Backend}>
          <AppHeader />
          <Routes location={profile || feed || background || location}>
            <Route path="/" element={<HomePage />} />
            <Route path="ingredients/:id" element={
              <div className={styles.section}>
                <IngredientDetailsPage data={data} />
              </div>
            } />
            <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
            <Route path="/register" element={<OnlyUnAuth component={<RegisterPage />} />} />
            <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
            {!redirect && <Route path="/reset-password" element={<ResetPasswordPage />} />}
            <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />} />
            <Route path="/orders" element={<OnlyAuth component={<OrdersHistoryPage />} />} />
            <Route path="/feed" element={<OrdersChainPage />} />
            <Route path="feed/:id" element={
              <div className={styles.section}>
                <OrderDetailsPage data={orders[orders.length - 1].orders} />
              </div>
            } />
            <Route path="orders/:id" element={<OnlyAuth component={<OrderDetailsPage data={profileOrder.messages.orders} />} />} />
          </Routes>
          {background && (
            <Routes>
              <Route path="ingredients/:id" element={
                <Modal onClose={onCloseIngredientModal}>
                  <IngredientDetailsPage data={data} />
                </Modal>
              } />
            </Routes>)}
          {feed && (
            <>
              <OrdersChainPage />
              <Routes>
                <Route path="feed/:id" element={
                  <Modal onClose={onCloseOrderModal}>
                    <OrderDetailsPage data={orders[orders.length - 1].orders} />
                  </Modal>
                } />
              </Routes>
            </>
          )}
          {profile && (
            <>
              <OrdersHistoryPage />
              <Routes>
                <Route path="orders/:id" element={
                  <Modal onClose={onCloseOrderProfileModal}>
                    <OrderDetailsPage data={profileOrder.messages.orders} />
                  </Modal>
                } />
              </Routes>
            </>
          )}
        </DndProvider>}
    </>
  );
}