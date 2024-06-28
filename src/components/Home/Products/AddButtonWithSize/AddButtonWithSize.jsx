import styled from "styled-components";
import { theme } from "../../../../styles/theme";

const Wrapper = styled.div``;

const SizeButtonWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  gap: 6px;
`;

const SizeButton = styled.button`
  padding: 6px 6px;
  border: ${(props) =>
    props.$active ? `1px solid ${theme.colors.red}` : "1ps solid transperent"};
  background-color: ${theme.colors.ligthGray};
`;

// const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

export default function SizeButtons({
  modifications,
  setActiveSize,
  activeSize
}) {
  const elements = modifications.map((item) => {
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
  return (
    <Wrapper>
      <SizeButtonWrapper>{elements}</SizeButtonWrapper>
    </Wrapper>
  );
}
