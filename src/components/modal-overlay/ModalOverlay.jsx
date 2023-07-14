import React from 'react'
import styles from './modaloverlay.module.css'

export default function ModalOverlay(props) {

    const handleOverlay = React.useCallback((evt) => {
        if (evt.target === evt.currentTarget) {
            props.onClose();
        }
    });

    React.useEffect(() => {
        const overlay = document.querySelector(`.${styles.overlay}`);

        if (overlay) {
            overlay.addEventListener('mousedown', handleOverlay);
        } else {
            return () => {
                overlay.removeEventListener('mousedown', handleOverlay);
            };
        }
    }, [handleOverlay]);

    return (
        <>
            <div className={styles.overlay}></div>
        </>
    );
}
