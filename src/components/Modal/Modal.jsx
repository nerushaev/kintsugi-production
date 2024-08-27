import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import useScroll from '../../hooks/useScroll';
import styled from 'styled-components';

const AnimationP = styled(motion.div)`
position: fixed;
width: 100%;
height: 100%;

display: flex;
align-items: center;
justify-content: center;
background-color: rgba(0, 0, 0, 0.3);
// overflow: hidden;
overflow-y: scroll;
top: 0;
left: 0;
z-index: 1000;
`;

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
    // <AnimatePresence mode="wait">
      <AnimationP variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden" 
      onClick={handleBackdropClick}>{props.children}</AnimationP>
    // </AnimatePresence>
    , modalRoot
  );
}

export default Modal;

const variants = {
  visible: {opacity: 1},
  hidden: {opacity: 0}
}