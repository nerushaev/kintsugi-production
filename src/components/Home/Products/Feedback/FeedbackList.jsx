import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  getFeedback,
  removeFeedback,
} from "../../../../redux/feedback/feedback-operations";
import { selectFeedback } from "../../../../redux/feedback/feedback-selectors";
import styled from "styled-components";
import { nanoid } from "@reduxjs/toolkit";
import Score from "./Score";
import { theme } from "../../../../styles/theme";
import ErrorMessage from "../../../Errors/ErrorMessage";
import { selectUser } from "../../../../redux/auth/auth-selectors";
import { MdDeleteForever } from "react-icons/md";

const FeedbackItem = styled.li`
  margin-bottom: 20px;
  padding: 10px;
  // background-color: #F2F2F2;
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const DeleteWrapper = styled.div``;

const CommentWrapper = styled.div`
  width: 100%;
  height: 80px;
  border: 1px solid rgb(0, 0, 0, 0.2);
  border-radius: 6px;
  padding: 10px;
  overflow: scroll;
`;

const Text = styled.p`
  font-size: ${(props) =>
      props.accent ? `${theme.fontSizes.medium}` : `${theme.fontSizes.small}`}
    @media (min-width: 767px) {
    font-size: ${(props) =>
      props.accent ? `${theme.fontSizes.large}` : `${theme.fontSizes.medium}`};
  }
  @media (min-width: 1199px) {
    font-size: ${(props) =>
      props.accent
        ? `${theme.fontSizes.extraLarge}`
        : `${theme.fontSizes.large}`};
  }
`;

export default function FeedbackList() {
  const dispatch = useDispatch();
  const product_id = useParams();
  const comments = useSelector(selectFeedback);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getFeedback(product_id));
  }, [dispatch, product_id]);

  const handleRemove = (data) => {
    dispatch(removeFeedback(data));
  };

  return (
    <ul>
      {comments.length < 1 && (
        <ErrorMessage message="Ваш відгук буде першим!" />
      )}
      {comments.map((item) => {
        const { name, score, comment, _id, product_id, date } = item;
        console.log(product_id);
        const randomId = nanoid();
        const isMyComment = user.email === item.email;
        return (
          <FeedbackItem key={randomId}>
            <p>{date}</p>
            <TopWrapper>
              <NameWrapper>
                <Score score={score} />
                <Text $accent>{name}</Text>
              </NameWrapper>
              {isMyComment && (
                <DeleteWrapper>
                  <MdDeleteForever
                    onClick={() =>
                      handleRemove({
                        _id,
                      })
                    }
                    style={{
                      fontSize: "24px",
                      color: `${theme.colors.redAccent}`,
                    }}
                  />
                </DeleteWrapper>
              )}
            </TopWrapper>
            <CommentWrapper>
              <Text>{comment}</Text>
            </CommentWrapper>
          </FeedbackItem>
        );
      })}
    </ul>
  );
}
