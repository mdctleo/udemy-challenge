import {createSelector} from 'reselect'
import {initialState} from './reducer'

const selectQuiz = state => state.quiz || initialState

export const selectQuizId = createSelector(
    selectQuiz,
    quiz => quiz._id
)

export const selectTitle = createSelector(
    selectQuiz,
    quiz => quiz.title
)

export const selectStep = createSelector(
    selectQuiz,
    quiz => quiz.step
)

export const selectQuestions = createSelector(
    selectQuiz,
    quiz => quiz.questions
)

export const selectQuestionsLength = createSelector(
    selectQuiz,
    quiz => quiz.questions.length
)

export const selectQuestion = createSelector(
    selectStep,
    selectQuestions,
    (step, questions) => questions[step]
)

export const selectQuestionText = createSelector(
    selectQuestion,
    question => question.question
)

export const selectOptions = createSelector(
    selectQuestion,
    question => question['options']
)

export const selectPoints = createSelector(
    selectQuestion,
    question => question.points
)

export const selectResponses = createSelector(
    selectQuiz,
    quiz => quiz.responses
)

export const selectResponse = createSelector(
    selectStep,
    selectResponses,
    (step, responses) => responses[step]
)

export const selectError = createSelector(
    selectQuiz,
    quiz => quiz.error
)

export const selectIsLoading = createSelector(
    selectQuiz,
    quiz => quiz.isLoading
)