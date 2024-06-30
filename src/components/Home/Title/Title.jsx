import React from "react";
import {Title,TitleWrapper} from '../../Text/Text.styled';


export default function MainTitle({ text }) {
  return <TitleWrapper><Title>{text}</Title></TitleWrapper>;
}
