import {ADD_RESPONSE, SET_ERROR, SET_LOADING, SET_QUIZ_DATA, SET_RESULT, SET_STEP} from './action'

export const initialState = {
    _id: "",
    title: "",
    questions: [{question: "", options: {}, points: 0}],
    step: 0,
    responses: [],
    error: {isError: false, msg: ""},
    isLoading: false,
    result: 0
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
                responses: responses,
                error: {...state.error}
            }
        case SET_STEP:
            return {
                ...state,
                questions: [...state.questions],
                step: action.step,
                error: {...state.error}
            }
        case ADD_RESPONSE:
            let r = [...state.responses]
            r[action.step] = action.key
            return {
                ...state,
                questions: [...state.questions],
                responses: r,
                error: {...state.error}
            }
        case SET_ERROR:
            return {
                ...state,
                questions: [...state.questions],
                error: {
                    isError: action.isError,
                    msg: action.msg
                }
            }
        case SET_LOADING:
            return {
                ...state,
                questions: [...state.questions],
                error: {...state.error},
                isLoading: action.isLoading
            }
        case SET_RESULT:
            return {
                ...state,
                questions: [...state.questions],
                error: {...state.error},
                result: action.result
            }
        default:
            return state
    }
}

export default quizReducer