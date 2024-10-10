import { memo } from "react";
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Border = styled(motion.div)`
  box-sizing: border-box;
  border: 1px solid ${props => props.$isError ? "red" : "transparent"};
  padding: 2px;
`;

const ErrorBorder = memo(({ children, isError }) => {
  return (
    <div>
      <Border
      $isError={isError}
      initial={{ opacity: 0 }} // Начальное состояние с прозрачным бордером
      animate={{ opacity: isError ? 1 : 0 }} // Анимация по условию isError
      transition={{ duration: 1 }} // Длительность анимации 1 секунда
    />
      {children}
    </div>
    
    
  );
});

export default ErrorBorder;
