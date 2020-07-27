import React from 'react'
import PropTypes from 'prop-types'
import {Button, Col, Row} from "antd";
import '../App.css';
import {selectQuestionsLength, selectQuizId, selectResponses, selectStep} from "../selector";
import {nextStep, prevStep, submitQuiz} from "../action";
import {connect} from "react-redux";


/***
 *  Next, previous and submit button. This component controls the flow of the application
 * @param step: the index of the current question
 * @param questionsLength: Total number of questions in the quiz
 * @param _id: id of the quiz
 * @param responses: holds responses of the quiz so far
 * @param nextStep: go to next question
 * @param prevStep: go to previous question
 * @param submitQuiz: submit quiz if validated
 * @return {*}
 * @constructor
 */
const Controls = ({step, questionsLength, _id, responses, nextStep, prevStep, submitQuiz}) => {
    return (
        <Row className="controls">
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Button disabled={step === 0} onClick={() => prevStep(step)}>Previous</Button>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Button type="primary" onClick={() => submitQuiz(_id, responses)}>Submit</Button>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Button disabled={step === questionsLength - 1} onClick={() => nextStep(step, questionsLength)}>Next</Button>
            </Col>
        </Row>
    )
}

Controls.propTypes = {
    step: PropTypes.number,
    questionsLength: PropTypes.number,
    _id: PropTypes.string,
    responses: PropTypes.array,
    nextStep: PropTypes.func,
    prevStep: PropTypes.func,
    submitQuiz: PropTypes.func
}

const mapStateToProps = state => {
    return {
        step: selectStep(state),
        questionsLength: selectQuestionsLength(state),
        _id: selectQuizId(state),
        responses: selectResponses(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        nextStep: (step, questionsLength) => dispatch(nextStep(step, questionsLength)),
        prevStep: step => dispatch(prevStep(step)),
        submitQuiz: (_id, responses) => dispatch(submitQuiz(_id, responses))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)