import styled from "styled-components";
import { theme } from "../../../../styles/theme";
import { memo, useMemo } from "react";
import { BlockText } from "../ProductsDetails/ProductsDetails.styled";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 5px;
  height: 65px;
`;

const SizeButtonWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden; /* можно оставить */
  white-space: nowrap;
  height: 100%;
  border: 1px solid rgba(255, 0, 0, 0);
  gap: 10px;
  padding-top: 5px;
  padding-left: 5px;
  padding-right: 5px;
  &::-webkit-scrollbar {=
    background-color: white;
    height: 5px;
    width: 8px;

  }
  &::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.gray}; /* Цвет ползунка */
    border-radius: 10px; /* Скругление */
  }
`;

const SizeButton = styled.button`
  font-family: "Montserrat Alternates";
  width: 100%;
  height: 100%;
  font-weight: 600;
  font-size: 14px;
  border: ${(props) =>
    props.$active ? `2px solid ${theme.colors.formButtonAccent}` : "2px solid white"};
  background-color: ${theme.colors.ligthGray};
`;

const SizeButtons = memo(
  ({ modificatorUknow, modifications, activeSize, setActiveSize }) => {
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
              : "rgba(255, 0, 0, 0)" /* Снова прозрачный */,
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
