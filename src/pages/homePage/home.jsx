import styles from './home.module.css';
import BurgerIngredients from '../../components/burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../../components/burger-constructor/BurgerConstructor';

export function HomePage() {
    return (
        <main className={`ml-5 mr-5 mb-15 ${styles.main}`}>
            <BurgerIngredients />
            <BurgerConstructor />
        </main>
    );
}