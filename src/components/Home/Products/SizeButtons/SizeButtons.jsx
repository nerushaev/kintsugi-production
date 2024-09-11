import styled from "styled-components";
import { theme } from "../../../../styles/theme";
import { memo, useMemo } from "react";
import { BlockText } from "../ProductsDetails/ProductsDetails.styled";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${props => props.$details ? "flex-start" : "center"};
`;

const SizeButtonWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  gap: 6px;
  @media(min-width: 767px) {
    margin-bottom: 20px;
  }
`;

const SizeButton = styled.button`
  padding: 6px 6px;
  border: ${(props) =>
    props.$active ? `1px solid ${theme.colors.red}` : "1px solid white"};
  background-color: ${theme.colors.ligthGray};
`;

// const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

const SizeButtons = memo(({ modifications, activeSize, setActiveSize, details }) => {

  // Меморизируем элементы кнопок для предотвращения лишних рендеров
  const elements = useMemo(() => {
    return modifications
      .filter(item => item.size_left > 0) // Фильтрация доступных размеров
      .map(item => {
        return(
          <SizeButton
          onClick={() => setActiveSize(item.modificator_name)}
          $active={item.modificator_name === activeSize}
          key={item.modificator_name}
        >
          {item.modificator_name}
        </SizeButton>
        )
        
  });
  }, [modifications, activeSize, setActiveSize]);

  return (
    <Wrapper $details={details}>
      <BlockText>
              Розмір: {activeSize ? activeSize : "One size"}
            </BlockText>
      <SizeButtonWrapper>{elements}</SizeButtonWrapper>
    </Wrapper>
  );
});

export default SizeButtons;