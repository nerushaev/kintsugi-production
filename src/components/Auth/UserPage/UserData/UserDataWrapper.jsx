import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
`;

export default function UserDataWrapper({ children }) {
  const [isShow, setIsShow] = useState(false);

  return isShow && <Wrapper>{children}</Wrapper>;
}
