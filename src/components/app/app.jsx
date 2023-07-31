import React from 'react'
import styles from "./app.module.css";
import AppHeader from "../appheader/AppHeader.jsx";
import BurgerIngredients from '../burger-ingredients/BurgerIngredients'
import BurgerConstructor from '../burger-constructor/BurgerConstructor'
import { fetchData } from '../../services/actions/fetchAction.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  const dispatch = useDispatch();
  const success = useSelector(store => store.data.success);

  React.useEffect(
    () => {
      dispatch(fetchData());
    },
    [dispatch]
  );

  return (success &&
    <>
      <AppHeader />
      <main className={`ml-5 mr-5 mb-15 ${styles.main}`}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </>
  );
}

export default App;
