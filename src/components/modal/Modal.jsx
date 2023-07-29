import React from 'react'
import styles from './modal.module.css'
import ModalOverlay from '../modal-overlay/ModalOverlay.jsx';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export default function Modal({onClose, children}) {

    const handleEscKey = React.useCallback((event) => {
        if (event.key === 'Escape') {
            onClose();
        }
    });

    React.useEffect(() => {
        document.addEventListener('keydown', handleEscKey);

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [handleEscKey]);

    return (
        ReactDOM.createPortal(
            <section className={styles.section}>
                <div className={`${styles.modal}`}>
                    <div className={styles['button__close']}>
                        <CloseIcon type="primary" onClick={() => {
                            onClose();
                        }} />
                    </div>
                    {children}
                </div>
                <ModalOverlay onClose={onClose} />
            </section>,
            document.getElementById('modals')
        )
    );
}
