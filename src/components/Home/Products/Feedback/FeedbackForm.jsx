import { useState } from "react";
import {
  FieldWrapper,
  Form,
  Input,
  Label,
} from "../../../Fields/Fields.styled";
import { Button } from "../../../Buttons/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../../redux/auth/auth-selectors";
import { useParams } from "react-router";
import { addFeedback } from "../../../../redux/feedback/feedback-operations";
import ScoreInput from "./ScoreInput";
import styled from 'styled-components';
import ErrorMessage from "../../../Errors/ErrorMessage";
import { useAuth } from "../../../../hooks/useAuth";

const ScoreWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export default function FeedbackForm() {
  const user = useSelector(selectUser);
  const {isLoggedIn} = useAuth();

  const dispatch = useDispatch();
  const { name, email } = user;
  const productId = useParams();

  const [comment, setComment] = useState("");
  const [score, setScore] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "comment":
        return setComment(value);
      case "score":
        return setScore(value);
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addFeedback({
      name,
      comment,
      score: Number(score),
      productId: productId._id,
      email
    }))
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FieldWrapper>
        <ScoreWrapper>
        <Label htmlFor="score">Ваша оцінка:</Label>
        <ScoreInput setScore={setScore} />
        </ScoreWrapper>
        <Label htmlFor="comment">Ваш комментар:</Label>
        <Input name="comment" value={comment} onChange={handleChange} />
      </FieldWrapper>
      {!isLoggedIn && <ErrorMessage message="Коментувати можуть лише зареєстровані користувачі!"/>}
      <Button disabled={!isLoggedIn} type="submit">Відправити</Button>
    </Form>
  );
}
