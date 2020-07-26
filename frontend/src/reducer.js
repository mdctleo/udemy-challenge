import {ADD_RESPONSE, SET_QUIZ_DATA, SET_STEP} from './action'

export const initialState = {
    _id: "",
    title: "",
    questions: [{question: "", options: {}, points: 0}],
    step: 0,
    responses: []
}

const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_QUIZ_DATA:
            let responses = action.questions.map(() =>{
                return undefined
            })
            return {
                ...state,
                _id: action._id,
                title: action.title,
                questions: action.questions,
                responses: responses
            }
        case SET_STEP:
            return {
                ...state,
                questions: [...state.questions],
                step: action.step
            }
        case ADD_RESPONSE:
            let r = [...state.responses]
            r[action.index] = action.key
            return {
                ...state,
                questions: [...state.questions],
                responses: r
            }
        default:
            return state
    }
}

export default quizReducer