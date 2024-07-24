import React, { forwardRef } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import { useLocation } from "react-router-dom";
import gsap from "gsap-trial";

const TransitionComponent = forwardRef(({ children }, ref) => {
  const location = useLocation();

  return (
    <SwitchTransition>
      <Transition
        key={location.pathname}
        timeout={500}
        nodeRef={ref} // Передаем реф для управления анимацией
        onEnter={() => {
          gsap.set(ref.current, { autoAlpha: 0 }); // Устанавливаем начальное состояние (прозрачность 0)
          gsap.to(ref.current, { autoAlpha: 1, duration: 0.5 }); // Плавное появление
        }}
        onExit={() => {
          gsap.to(ref.current, { autoAlpha: 0, duration: 0.5 }); // Плавное исчезновение
        }}
      >
        {(state) => (
          <div ref={ref} className={`fade ${state}`}>
            {children}
          </div>
        )}
      </Transition>
    </SwitchTransition>
  );
});

export default TransitionComponent;
