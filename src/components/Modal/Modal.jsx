import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import useScroll from '../../hooks/useScroll';

import { Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

function Modal(props) {
  const { blockScroll, unBlockScroll } = useScroll();

  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        props.onCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    blockScroll();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      unBlockScroll();
    };
  }, [props, blockScroll, unBlockScroll]);

  const handleBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      props.onCloseModal();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>{props.children}</Overlay>,
    modalRoot
  );
}

export default Modal;
