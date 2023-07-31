import styles from './modaloverlay.module.css'
import PropTypes from 'prop-types'

export default function ModalOverlay(props) {

    return (
        <div className={styles.overlay} onClick={props.onClose}></div>
    );
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func
}