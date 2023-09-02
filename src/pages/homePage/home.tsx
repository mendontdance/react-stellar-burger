import styles from './home.module.css';
import { BurgerIngredients } from '../../components/burger-ingredients/BurgerIngredients';
import { BurgerConstructor } from '../../components/burger-constructor/BurgerConstructor';
import React, { FC } from 'react';
import { useSelector } from '../../services/types/hooks';
import { Payload } from '../../components/payload/Payload';

export const HomePage: FC = () => {

    const asdf = useSelector(store => store.data.data)

    React.useEffect(() => {
        if (asdf) {
            setState(true)
        }
    }, [])

    const [state, setState] = React.useState<boolean>(false)

    return (
        <>
            {state ? <main className={`ml-5 mr-5 mb-15 ${styles.main}`}>
                <BurgerIngredients />
                <BurgerConstructor />
            </main> : <Payload/>}
        </>
    );
}