import styled from "styled-components";
import { theme } from "../../../../styles/theme";
import { memo, useMemo } from "react";
import { BlockText } from "../ProductsDetails/ProductsDetails.styled";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const SizeButtonWrapper = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  height: 40px;
  max-width: 100%;
  overflow: auto;
  box-sizing: border-box;
  border: 1px solid rgba(255, 0, 0, 0);
  gap: 5px;
`;


const SizeButton = styled.button`
  font-family: "Montserrat Alternates";
  min-width: 30px;
  // height: 30px;
  font-weight: 600;
  font-size: 16px;
  border: ${(props) =>
    props.$active ? `1px solid ${theme.colors.black}` : "1px solid white"};
  background-color: ${theme.colors.ligthGray};
`;

const SizeButtons = memo(
  ({ modificatorUknow, modifications, activeSize, setActiveSize }) => {
    console.log(modifications);
    // Меморизируем элементы кнопок для предотвращения лишних рендеров
    const elements = useMemo(() => {
      return modifications
        .filter((item) => item.size_left > 0) // Фильтрация доступных размеров
        .map((item) => {
          return (
            <SizeButton
              onClick={() => setActiveSize(item.modificator_name)}
              $active={item.modificator_name === activeSize}
              key={item.modificator_name}
            >
              {item.modificator_name}
            </SizeButton>
          );
        });
    }, [modifications, activeSize, setActiveSize]);

    return (
      <Wrapper>
        <BlockText>Розмір:</BlockText>
        
        <SizeButtonWrapper
          $isError={modificatorUknow}
          initial={{ borderColor: "rgba(255, 0, 0, 0)" }} /* Прозрачный */
          animate={{
            borderColor: modificatorUknow
              ? "rgba(255, 0, 0, 1)" /* Непрозрачный бордер */
              : "rgba(255, 0, 0, 0)", /* Снова прозрачный */
          }}
          transition={{ duration: 1 }}
        >
          {modifications?.length === 0 && (
          <SizeButton $active={true} key={"One Size"}>
            Один Розмір
          </SizeButton>
        )}
          {elements}
        </SizeButtonWrapper>
      </Wrapper>
    );
  }
);

export default SizeButtons;
