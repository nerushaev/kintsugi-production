import React from 'react'
import FeedbackForm from '../../Feedback/FeedbackForm'
import FeedbackList from '../../Feedback/FeedbackList'
import { FeedbackItemWrapper, FeedbackWrapper } from './MoreInfoControlls'

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
