import React from 'react'
import PropTypes from 'prop-types'
import {Button, Col, Row} from "antd";
import '../App.css';
import {selectQuestionsLength, selectStep} from "../selector";
import {setStep} from "../action";
import {connect} from "react-redux";


const Controls = ({step, questionsLength, setStep}) => {
    return (
        <Row className="controls">
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Button onClick={() => setStep(step--, questionsLength)}>Previous</Button>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Button type="primary">Submit</Button>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Button onClick={() => setStep(step++, questionsLength)}>Next</Button>
            </Col>
        </Row>
    )
}

Controls.propTypes = {
    step: PropTypes.number,
    questionsLength: PropTypes.number,
    setStep: PropTypes.func
}

const mapStateToProps = state => {
    return {
        step: selectStep(state),
        questionsLength: selectQuestionsLength(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setStep: (step, questionsLength) => dispatch(setStep(step, questionsLength))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)