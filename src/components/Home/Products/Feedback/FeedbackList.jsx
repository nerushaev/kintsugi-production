import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getFeedback } from "../../../../redux/feedback/feedback-operations";
import { selectFeedback } from "../../../../redux/feedback/feedback-selectors";
import styled from "styled-components";
import { nanoid } from "@reduxjs/toolkit";
import Score from "./Score";
import { theme } from "../../../../styles/theme";
import ErrorMessage from "../../../Errors/ErrorMessage";

const FeedbackItem = styled.li`
  margin-bottom: 20px;
  padding: 10px;
  background-color: #F2F2F2;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  `;

  const Text = styled.p`
    font-size: ${props => props.accent ? `${theme.fontSizes.medium}` : `${theme.fontSizes.small}`}
    @media (min-width: 767px) {
    font-size: ${props => props.accent ? `${theme.fontSizes.large}` : `${theme.fontSizes.medium}`}
    }
    @media (min-width: 1199px) {
      font-size: ${props => props.accent ? `${theme.fontSizes.extraLarge}` : `${theme.fontSizes.large}`}
      }
  `;

export default function FeedbackList() {
  const dispatch = useDispatch();
  const productId = useParams();
  const comments = useSelector(selectFeedback);

  useEffect(() => {
    dispatch(getFeedback(productId));
  }, [dispatch, productId]);

  return (
    <ul>
      {comments.length < 1 && <ErrorMessage message="Ваш відгук буде першим!" />}
      {comments.map((item) => {
        const { name, score, comment } = item;
        const randomId = nanoid();
        return (
          <FeedbackItem key={randomId}>
            <ContentWrapper>
              <Text $accent>{name}</Text>
              <Score score={score} />
            </ContentWrapper>
            <Text>{comment}</Text>
          </FeedbackItem>
        );
      })}
    </ul>
  );
}
