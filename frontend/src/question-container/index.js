import React from 'react'
import PropTypes from 'prop-types'
import {
    selectOptions,
    selectPoints,
    selectQuestionsLength,
    selectQuestionText,
    selectResponse,
    selectStep
} from '../selector'
import Question from "../question";
import Options from "../options";
import {connect} from "react-redux";
import {addResponse} from "../action";

const QuestionContainer = ({questionText, options, points, step, questionsLength, response, addResponse}) => {
    return (
        <div>
            <Question questionText={questionText} step={step} points={points} questionsLength={questionsLength}/>
            <Options options={options} step={step} addResponse={addResponse} response={response}/>
        </div>
    )

}

QuestionContainer.propTypes = {
    questionText: PropTypes.string,
    options: PropTypes.object,
    points: PropTypes.number,
    step: PropTypes.number,
    questionsLength: PropTypes.number,
    response: PropTypes.string,
    addResponse: PropTypes.func

}

const mapStateToProps = state => {
    return {
        questionText: selectQuestionText(state),
        options: selectOptions(state),
        points: selectPoints(state),
        step: selectStep(state),
        questionsLength: selectQuestionsLength(state),
        response: selectResponse(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addResponse: (step, key) => dispatch(addResponse(step, key))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer)