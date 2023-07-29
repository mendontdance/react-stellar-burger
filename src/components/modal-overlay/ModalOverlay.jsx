import React from 'react'
import styles from './modaloverlay.module.css'

export default function ModalOverlay(props) {

    return (
        <div className={styles.overlay} onClick={props.onClose}></div>
    );
}
