import {BASE_API} from './api'
import request from 'superagent'

export const SET_QUIZ_DATA = 'SET_QUIZ_DATA'

export const SET_STEP = 'SET_STEP'

export const ADD_RESPONSE = 'ADD_RESPONSE'

export const SUBMIT_QUIZ = 'SUBMIT_QUIZ'

export const SET_LOADING = 'SET_LOADING'

export const SET_ERROR = 'SET_ERROR'

export const setQuizData = (_id, title, questions) => ({
    type: SET_QUIZ_DATA,
    _id,
    title,
    questions
})

export const setStep = (step, questionsLength) => {
    // moving to previous or next question is only valid if it is with in the number of questions
    if (step < 0 || step >= questionsLength) {
        return
    }

    return ({
    type: SET_STEP,
    step
})}

export const addResponse = (step, key) => ({
    type: ADD_RESPONSE,
    step,
    key
})

export const getQuiz = (_id) => {
    return dispatch => {
        let url = `${BASE_API}/quiz`
        return request.get(url)
            .query(`_id=${_id}`)
            .then(response => {
                let quiz = response.body
                dispatch(setQuizData(quiz._id, quiz.title, quiz.questions))
            })
            .catch(err => {
                console.log(err)
            })
    }

}