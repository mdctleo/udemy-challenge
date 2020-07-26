import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row, Divider} from 'antd'

const Question = ({question}) => {
    return (
        <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <h3 className="question-text">{'There is a runaway trolley barreling down the railway tracks. ' +
                'Ahead, on the tracks, there are five people tied up and unable to move. ' +
                'The trolley is headed straight for them. You are standing some distance off in the train yard, ' +
                'next to a lever. If you pull this lever, the trolley will switch to a different set of tracks. ' +
                'However, you notice that there is one person on the side track. Pick the most ethical option:'}</h3>
                <Divider/>
            </Col>
        </Row>
    )
}

Question.propTypes = {
    question: PropTypes.string
}

export default Question