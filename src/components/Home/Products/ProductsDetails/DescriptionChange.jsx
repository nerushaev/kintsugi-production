import React, { memo, useState } from "react";
import {
  Block,
} from "../../../Busket/CheckoutPage/CheckoutSteps/Steps.styled";
import { MdOutlineEditNote } from "react-icons/md";
import { Button } from "../../../Form/Form.styled";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { updateProduct } from "../../../../redux/products/products-operation";
import { selectRole } from "../../../../redux/auth/auth-selectors";
import { BlockTitle, BlockTitleWrapper, Text } from "../../../Text/Text.styled";

const Textarea = styled.textarea`
  font-family: "Montserrat";
  width: 100%;
  border-radius: 6px;
  margin-bottom: 20px;
  padding: 10px;
  height: 100px;
`;

const TextWithParagraphs = ({ text }) => {
  return text.split('\n').map((paragraph, index) => (
    <p key={index} style={{ marginBottom: '10px' }}>{paragraph}</p>
  ));
};

const DescriptionChange = memo(({ description, product_id }) => {
  const isAdmin = useSelector(selectRole) === "admin";
  const [editDescription, setEditDescription] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState(description || "");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ product_id, description: descriptionInput }));
    setEditDescription(false); // Скрыть текстовое поле после сохранения
  };

  return (
    <>
      <Block style={{display: "block"}}>
      {isAdmin &&
        <div style={{ position: "absolute", right: "10px", cursor: "pointer" }}>
        <MdOutlineEditNote
          onClick={() => setEditDescription((prev) => !prev)}
          style={{ fontSize: "28px" }}
        />
      </div>
      }
      <BlockTitleWrapper>
      <BlockTitle $accent style={{ textAlign: "left" }}>Опис товару</BlockTitle>
      </BlockTitleWrapper>
      
      {editDescription ? (
        <form onSubmit={handleSubmit}>
          <Textarea
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
            name="description"
            id="description"
          />
          <Button type="submit">Зберегти</Button>
        </form>
      ) : (
        <>
        {description ? <TextWithParagraphs text={description}/> : ""}
        </>
      )}
    </Block>
    </>
  );
});

export default DescriptionChange;
