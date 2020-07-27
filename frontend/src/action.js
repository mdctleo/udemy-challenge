import {BASE_API} from './api'
import request from 'superagent'

export const SET_QUIZ_DATA = 'SET_QUIZ_DATA'

export const SET_STEP = 'SET_STEP'

export const ADD_RESPONSE = 'ADD_RESPONSE'

export const SET_LOADING = 'SET_LOADING'

export const SET_ERROR = 'SET_ERROR'

export const SET_RESULT = 'SET_RESULT'

export const setQuizData = (_id, title, questions) => ({
    type: SET_QUIZ_DATA,
    _id,
    title,
    questions
})

export const nextStep = (step, questionsLength) => {
    // moving to next question is only valid if it is within the number of questions
    if (step === questionsLength - 1) {
        return ({
            type: null
        })
    }

    step++

    return ({
    type: SET_STEP,
    step
})}

export const prevStep = (step) => {
    // moving to previous question is only valid if it is within the number of questions
    if (step === 0) {
        return ({
            type: null
        })
    }

    step--

    return ({
        type: SET_STEP,
        step
    })
}

export const addResponse = (step, key) => ({
    type: ADD_RESPONSE,
    step,
    key
})

export const setResult = result => ({
    type: SET_RESULT,
    result
})

export const setError = (isError, msg) => ({
    type: SET_ERROR,
    isError,
    msg
})

export const setLoading = (isLoading) => ({
    type: SET_LOADING,
    isLoading
})

export const getQuiz = (_id) => {
    return dispatch => {
        dispatch(setLoading(true))
        let url = `${BASE_API}/quiz`
        return request.get(url)
            .query(`_id=${_id}`)
            .then(response => {
                let quiz = response.body
                dispatch(setQuizData(quiz._id, quiz.title, quiz.questions))
            })
            .catch(err => {
                dispatch(setError(true, err.message))
            })
            .finally(() => {
                dispatch(setLoading(false))
            })
    }
}

export const submitQuiz = (_id, responses) => {
    return dispatch => {
        dispatch(setLoading(true))
        let incompleteResponses = []
        responses.forEach((response, index) => {
            if (response === undefined) {
                incompleteResponses.push(index + 1)
            }
        })

        if (incompleteResponses.length > 0) {
            dispatch(setError(true, `Incomplete responses ${incompleteResponses}`))
            dispatch(setLoading(false))
            return
        }

        let url = `${BASE_API}/quiz`
        return request.post(url)
            .send({_id: _id, responses: responses})
            .then(response => {
                let result = response.body
                dispatch(setResult(result))
            })
            .catch(err => {
                dispatch(setError(true, err.message))
            })
            .finally(() => {
                dispatch(setLoading(false))
            })
    }
}