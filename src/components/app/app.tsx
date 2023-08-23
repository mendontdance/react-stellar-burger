import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import React, { FC } from 'react'
import { fetchData } from '../../services/actions/fetchAction';
import { useDispatch, useSelector } from 'react-redux';
import { HomePage, ForgotPasswordPage, IngredientDetailsPage, LoginPage, OrdersChainPage, ProfilePage, RegisterPage, ResetPasswordPage } from '../../pages';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/ProtectedRoute';
import { checkUserAuth } from '../../services/actions/authAction';
import { Modal } from '../modal/Modal';
import { OPEN_INGREDIENT_MODAL_FAILED } from '../../services/actions/modalAction';
import { AppHeader } from '../appheader/AppHeader';
import styles from './app.module.css'
import { RootState } from '../../services/reducers/rootReducer.js';

export const App: FC = () => {

  const dispatch = useDispatch();
  const success: boolean = useSelector((store: RootState) => store.data.success);
  const data = useSelector((store: RootState) => store.data.data)

  React.useEffect(
    ():void => {
      dispatch(fetchData());
    },
    [dispatch]
  );

  React.useEffect(
    ():void => {
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

  const redirect: boolean = useSelector((store: RootState) => store.user.redirect)
  const navigate = useNavigate()

  React.useEffect(():void => {
    if (redirect && location.pathname === '/reset-password') {
      navigate('/login')
    }
  }, [redirect])

  const onClose = (): void => {
    closeModal(false)
    navigate('/')
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
            <Route path="/orders" element={<OnlyAuth component={<ProfilePage />} />} />
            <Route path="/orders-chain" element={<OnlyAuth component={<OrdersChainPage />} />} />
            <Route path="/orders-history" element={<HomePage />} />
          </Routes>
          {background && (
            <Routes>
              <Route path="ingredients/:id" element={
                <Modal onClose={onClose}>
                  <IngredientDetailsPage data={data} />
                </Modal>
              } />
            </Routes>)}
        </DndProvider>}
    </>
  );
}