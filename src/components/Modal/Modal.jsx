import { Component } from 'react';
import { createPortal } from 'react-dom';
import propTypes from 'prop-types';
import { Backdrop, ModalWindow, Img } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
    
    static propTypes = {
        onClose: propTypes.func.isRequired,
        largeImage: propTypes.string.isRequired,
    };
    componentDidMount() {
        window.addEventListener('keydown', this.heandleKeyDown)
    };
    componentWillUnmount() {
        window.removeEventListener('keydown', this.heandleKeyDown)
    };
    heandleKeyDown = event => {
        if (event.code === 'Escape') {
            this.props.onClose();
        }
    };
    heandleBackdropClose = ({ target, currentTarget }) => {
        if (currentTarget === target) {
            this.props.onClose();
        }
    };

    render() {
        const { largeImage } = this.props;
        const { heandleBackdropClose } = this;
        
      return createPortal(
        <Backdrop onClick={heandleBackdropClose}>
            <ModalWindow>
                <Img
                    src={largeImage}
                    loading="lazy"/>
            </ModalWindow>
        </Backdrop>, modalRoot
    );
  }
};