import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row, Divider} from 'antd'

const Question = ({questionText}) => {
    return (
        <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <h3 className="question-text">{questionText}</h3>
                <Divider/>
            </Col>
        </Row>
    )
}

Question.propTypes = {
    question: PropTypes.string
}

export default Question