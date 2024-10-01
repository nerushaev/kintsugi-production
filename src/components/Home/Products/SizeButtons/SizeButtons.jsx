import styled from "styled-components";
import { theme } from "../../../../styles/theme";
import { memo, useMemo } from "react";
import { BlockText } from "../ProductsDetails/ProductsDetails.styled";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

`;

const SizeButtonWrapper = styled.div`
box-sizing: border-box;
  display: flex;
  margin-bottom: 10px;
  gap: 5px;
`;

const SizeButton = styled.button`
  font-family: "Montserrat Alternates";
  min-width: 30px;
  height: 30px;
  font-weight: 600;
  font-size: 16px;
  border: ${(props) =>
    props.$active ? `1px solid ${theme.colors.black}` : "1px solid white"};
  background-color: ${theme.colors.ligthGray};
`;

// const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

const SizeButtons = memo(({modificatorUknow, modifications, activeSize, setActiveSize }) => {
  console.log(modifications)
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
    <Wrapper >
      <BlockText>
              Розмір:
            </BlockText>
            {modifications?.length === 0 &&
              <SizeButton
              $active={true}
              key={"One Size"}
            >
              Один Розмір
            </SizeButton>
            }
      <SizeButtonWrapper modificatorUknow={modificatorUknow}>{elements}</SizeButtonWrapper>
    </Wrapper>
  );
});

export default SizeButtons;