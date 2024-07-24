import React from 'react'
import FeedbackForm from '../../Feedback/FeedbackForm'
import FeedbackList from '../../Feedback/FeedbackList'
import styled from 'styled-components';

const FeedbackWrapper = styled.div`
display: flex;
flex-direction: column;
  @media (min-width: 767px) {
    display: flex;
    flex-direction: row;
    gap: 30px;
  }
`;

const FeedbackItemWrapper = styled.div`
  flex: 0 0 50%;
`;

export default function Feedback() {
  return (
    <FeedbackWrapper>
    <FeedbackItemWrapper>
    <FeedbackForm />
    </FeedbackItemWrapper>
    <FeedbackItemWrapper>
    <FeedbackList />
    </FeedbackItemWrapper>
    </FeedbackWrapper>
  )
}
