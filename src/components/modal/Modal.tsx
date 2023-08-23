import React, { FC } from 'react'
import styles from './modal.module.css'
import { ModalOverlay } from '../modal-overlay/ModalOverlay';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

type TProps = {
    onClose: () => void,
    children: any
}

export const Modal: FC<TProps> = ({ onClose, children }) => {

    React.useEffect(() => {
        const handleEscKey = (event: any): void => {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keydown', handleEscKey);

        return (): void => {
            document.removeEventListener('keydown', handleEscKey);
        };
    });

    return (
        ReactDOM.createPortal(
            <section className={styles.section}>
                <div className={`${styles.modal}`}>
                    <div className={styles['button__close']}>
                        <CloseIcon type="primary" onClick={() => {
                            onClose();
                        }} />
                    </div>
                    <div className={styles.content}>
                        {children}
                    </div>
                </div>
                <ModalOverlay onClose={onClose} />
            </section>,
            document.getElementById('modals') as Element
        )
    );
}
