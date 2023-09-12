import { nanoid } from "nanoid";
import { Notify } from "notiflix";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from 'styled-components';
import { updateProduct } from "../../../redux/products/products-operation";
import { Button } from "../../Buttons/Buttons";

const Container = styled.div`
  display: flex;
  overflow: scroll;
  width: 100%;
  max-width: 100%;
  // padding-left: 14px;
  border: 1px grey solid;
  border-radius: 5px;
  color: black;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const Input = styled.textarea`
  width: 100%;
  min-width: 50%;
  border: 1px solid black;
  padding: 14px;
  padding-left: 14px;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  margin: 7px 0;
  margin-right: 10px;
  padding: 0 10px;
  padding-right: 5px;
  border: 1px solid orange;
  border-radius: 5px;
  background-color: orange;
  white-space: nowrap;
  color: white;
  height: 30px;
`;

const DeleteButton = styled.button`
  display: flex;
  padding: 6px;
  border: none;
  background-color: unset;
  cursor: pointer;
  color: white;
`;

export default function CustomTagsInput({_id, oldTags, loading}) {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState(oldTags || []);
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const dispatch = useDispatch();

  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (key === "," && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      console.log('here');
      setTags((prevState) => [...prevState, trimmedInput]);
      setInput("");
    } else if (tags.includes(trimmedInput)) {
      Notify.failure("Такий тег вже є!", {showOnlyTheLastOne: true})
    }

    if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setTags(tagsCopy);
      setInput(poppedTag);
    }
    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };

  const deleteTag = (index) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(updateProduct({tags, _id}));
  }

  return (
    
    <Container>
      {tags.map((tag, index) => (
        <Tag key={nanoid()} className="tag">
          {tag}
          <DeleteButton onClick={() => deleteTag(index)}>x</DeleteButton>
        </Tag>
      ))}
      <Input
        value={input}
        placeholder="Введіть теги та розділяйте їх комою"
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onChange={onChange}
      />
      <Button onClick={handleClick}>Зберегти</Button>
    </Container>
  );
}
