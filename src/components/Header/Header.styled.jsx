import { motion } from "framer-motion";
import styled from "styled-components";

export const BusketWrapper = styled.div`
  position: relative;
`;

export const TotalPrice = styled.p`
  position: absolute;
  width: 22px;
  height: 22px;
  right: 8px;
  bottom: -12px;
  z-index: 1000;
  background-color: lightgray;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;

export const AnimationP = styled(motion.div)`
`;

export const LinksWrapper = styled.div`
display: flex;
align-items: center;
margin-right: 20px;
@media (min-width: 767px) {
  font-size: 16px;
  gap: 15px;
}
@media (min-width: 1199px) {
  font-size: 20px;
  gap: 15px;
}
`;