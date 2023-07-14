import React from 'react'
import styles from './modal.module.css'
import SubmitModal from '../submit-modal/SubmitModal';
import IngredientModal from '../ingredient-modal/IngredientModal';
import ModalOverlay from '../modal-overlay/ModalOverlay.jsx';

export default function Modal(props, key) {

    const filter = props.modalSubmit ? <SubmitModal {...props} /> : <IngredientModal {...props} />

    const handleEscKey = React.useCallback((event) => {
        if (event.key === 'Escape') {
            props.onClose();
        }
    });

    React.useEffect(() => {
        document.addEventListener('keydown', handleEscKey);

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [handleEscKey]);


    return (
        <section className={styles.section}>
            <div className={`${styles.modal}`} key={key}>
                {filter}
                <ModalOverlay onClose={props.onClose} />
            </div>
        </section>
    );
}
