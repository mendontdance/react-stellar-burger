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
import { RootState } from '../../services/reducers/rootReducer.js';
import { useDispatch, useSelector } from '../../services/types/hooks';

export const App: FC = () => {

  const dispatch = useDispatch();
  const success: boolean = useSelector((store: RootState) => store.data.success);
  const data = useSelector((store: RootState) => store.data.data)
  const orders = useSelector((store: RootState) => store.order.messages)

  React.useEffect(
    (): void => {
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
  const background = location.state && location.state.background;
  const feed = location.state && location.state.feed

  const redirect: boolean = useSelector((store: RootState) => store.user.redirect)
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

  return (
    <>
      {success &&
        <DndProvider backend={HTML5Backend}>
          <AppHeader />
          <Routes location={background || location}>
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
            <Route path="/feed/:id" element={<OrderDetailsPage data={orders[orders.length - 1].orders} />} />
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
            <Routes>
              <Route path="/feed/:id" element={
                <Modal onClose={onCloseOrderModal}>
                  <OrderDetailsPage data={orders[orders.length - 1].orders} />
                </Modal>
              } />
            </Routes>
          )}
        </DndProvider>}
    </>
  );
}