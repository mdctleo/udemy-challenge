import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row, Divider} from 'antd'

/***
 * Question Header
 * @param questionText: the question statement
 * @param step: the index of the current question
 * @param questionsLength: total number of questions in the quiz
 * @param points: numeric worth of the current question
 * @return {*}
 * @constructor
 */

const Question = ({questionText, step, questionsLength, points}) => {
    return (
        <div>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <h3 className="question-text">Question {step + 1} out of {questionsLength} : {points} points</h3>
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <h3 className="question-text">{questionText}</h3>
                    <Divider/>
                </Col>
            </Row>
        </div>
    )
}

Question.propTypes = {
    question: PropTypes.string,
    step: PropTypes.number,
    questionsLength: PropTypes.number,
    points: PropTypes.number
}

export default Question