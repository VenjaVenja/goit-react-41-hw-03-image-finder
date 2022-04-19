import { Component } from 'react';
import { createPortal } from 'react-dom';
import propTypes from 'prop-types';
import { Backdrop, ModalWindow, Img } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
    
    static propTypes = {
        currentImg: propTypes.string.isRequired,
        currentImgDescr: propTypes.string.isRequired,
    };

    componentDidMount() {
        // console.log('Modal was mount')
        window.addEventListener('keydown', this.heandleKeyDown)
    };

    componentWillUnmount() {
        // console.log('Modal was unmount')
        window.removeEventListener('keydown', this.heandleKeyDown)
    };
    
    heandleKeyDown = event => {
        if (event.code === 'Escape') {
            this.props.onClose();
        }
    };

    heandleBackdropClouse = ({ target, currentTarget }) => {
        // console.log('Кликнули в бекдроп');
        if (currentTarget === target) {
            this.props.onClose();
        }
    };

    render() {
        const { currentImg, currentImgDescr } = this.props;
        const { heandleBackdropClouse } = this;
        
      return createPortal(
        <Backdrop onClick={heandleBackdropClouse}>
            <ModalWindow>
                <Img src={currentImg}
                      alt={currentImgDescr}
                    loading="lazy"/>
            </ModalWindow>
        </Backdrop>, modalRoot
    );
  }
};
