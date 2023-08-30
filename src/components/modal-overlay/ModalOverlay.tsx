import { FC } from 'react';
import styles from './modaloverlay.module.css'

export const ModalOverlay: FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <div className={styles.overlay} onClick={onClose}></div>
    );
}