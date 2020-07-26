import React from 'react'
import PropTypes from 'prop-types'
import {selectOptions, selectPoints, selectQuestionText, selectStep} from '../selector'
import Question from "../question";
import Options from "../options";
import {connect} from "react-redux";
import {addResponse} from "../action";

const QuestionContainer = ({questionText, options, points, step, addResponse}) => {
    return (
        <div>
            <Question questionText={questionText}/>
            <Options options={options} step={step} addResponse={addResponse}/>
        </div>
    )

}

QuestionContainer.propTypes = {
    questionText: PropTypes.string,
    options: PropTypes.object,
    points: PropTypes.number,
    step: PropTypes.number,
    addResponse: PropTypes.func

}

const mapStateToProps = state => {
    return {
        questionText: selectQuestionText(state),
        options: selectOptions(state),
        points: selectPoints(state),
        step: selectStep(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addResponse: (step, key) => dispatch(addResponse(step, key))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer)