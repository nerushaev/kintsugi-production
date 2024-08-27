import React, { useState } from "react";
import {
  Block,
  BlockText,
  BlockTitle,
} from "../../../Busket/CheckoutPage/CheckoutSteps/Steps.styled";
import { MdOutlineEditNote } from "react-icons/md";
import { Button } from "../../../Form/Form.styled";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { updateProduct } from "../../../../redux/products/products-operation";

const Textarea = styled.textarea`
  width: 100%;
  border-radius: 6px;
  margin-bottom: 20px;
  padding: 10px;
  height: 100px;
`;

export default function DescriptionChange({ description, product_id }) {
  const [editDescription, setEditDescription] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState(description || "");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ product_id, description: descriptionInput }));
    setEditDescription(false); // Скрыть текстовое поле после сохранения
  };

  return (
    <Block style={{display: "block"}}>
      <div style={{ position: "absolute", right: "10px", cursor: "pointer" }}>
        <MdOutlineEditNote
          onClick={() => setEditDescription((prev) => !prev)}
          style={{ fontSize: "28px" }}
        />
      </div>
      <BlockTitle style={{ textAlign: "left" }}>Опис товару</BlockTitle>
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
        <BlockText>{description}</BlockText>
      )}
    </Block>
  );
}
