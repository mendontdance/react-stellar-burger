import React from 'react'
import styles from "./app.module.css";
import AppHeader from "../appheader/AppHeader.jsx";
import BurgerIngredients from '../burger-ingredients/BurgerIngredients'
import BurgerConstructor from '../burger-constructor/BurgerConstructor'


function App() {

  const [state, setState] = React.useState({ success: false });

  React.useEffect(() => {
    const url = 'https://norma.nomoreparties.space/api/ingredients';
    const fetchData = async () => {
      const result = await fetch(url)
      result.json()
        .then(res => {
        setState(res);
      })
        .catch(err => console.log(err))
    }
    fetchData();
  }, []);

  return (state.success &&
    <>
      <AppHeader />
      <main className={`ml-5 mr-5 mb-15 ${styles.main}`}>
        <BurgerIngredients data={state.data} />
        <BurgerConstructor data={state.data} />
      </main>
    </>
  );
}

export default App;
