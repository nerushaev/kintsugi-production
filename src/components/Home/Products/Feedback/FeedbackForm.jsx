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

export default function FeedbackForm() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { name, email } = user;
  const productId = useParams();

  const [comment, setComment] = useState("");
  const [score, setScore] = useState(5);

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
        <Label htmlFor="score">Ваша оцінка:</Label>
        <p>{score}</p>
        <Input name="score" type="range" min="1" max="5" value={score} onChange={handleChange} />
        <Label htmlFor="comment">Ваш комментар:</Label>
        <Input name="comment" value={comment} onChange={handleChange} />
      </FieldWrapper>
      <Button type="submit">Відправити</Button>
    </Form>
  );
}
