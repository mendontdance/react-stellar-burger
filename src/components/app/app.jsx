import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import React from 'react'
import { fetchData } from '../../services/actions/fetchAction.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { HomePage } from '../../pages';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RegisterPage } from '../../pages/RegisterPage/Register.jsx';
import { LoginPage } from '../../pages/LoginPage/Login.jsx';
import { ForgotPasswordPage } from '../../pages/ForgotPassword/ForgotPassword.jsx';
import { ProfilePage } from '../../pages/ProfilePage/Profile.jsx';
import { ResetPasswordPage } from '../../pages/ResetPassword/ResetPassword.jsx';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/ProtectedRoute.jsx';
import { checkUserAuth } from '../../services/actions/authAction.jsx';
import Modal from '../modal/Modal.jsx';
import { OPEN_INGREDIENT_MODAL_FAILED } from '../../services/actions/modalAction.jsx';
import { IngredientDetailsPage } from '../../pages/IngredientDetailsPage/IngredientDetailsPage.jsx';
import AppHeader from '../appheader/AppHeader.jsx';
import styles from './app.module.css'
import { OrdersChainPage } from '../../pages/OrdersChain/OrdersChain.jsx';

export default function App() {
  const dispatch = useDispatch();
  const success = useSelector(store => store.data.success);
  const data = useSelector(store => store.data.data)
  React.useEffect(
    () => {
      dispatch(fetchData());
    },
    [dispatch]
  );

  React.useEffect(
    () => {
      dispatch(checkUserAuth());
    },
    []
  );

  const closeModal = (state) => {
    dispatch({
      type: OPEN_INGREDIENT_MODAL_FAILED,
      showModalIngredient: state,
      data: {}
    })
  }

  const location = useLocation();
  const background = location.state && location.state.background;

  const redirect = useSelector(store => store.user.redirect)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (redirect && location.pathname === '/reset-password') {
      navigate('/login')
    }
  }, [redirect])

  return (success &&
    <DndProvider backend={HTML5Backend}>
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="ingredients/:id" element={
          <>
            <AppHeader />
            <div className={styles.section}>
              <IngredientDetailsPage data={data} />
            </div>
          </>} />
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
            <Modal onClose={() => { closeModal(false) }}>
              <IngredientDetailsPage data={data} />
            </Modal>
          } />
        </Routes>)}
    </DndProvider>
  );
}