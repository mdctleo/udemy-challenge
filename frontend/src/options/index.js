import React from 'react'
import PropTypes from 'prop-types'
import {Radio, Row} from "antd";
import "../App.css"

/***
 * Multiple-choices for the current question
 * @param options: choices
 * @param step: the index of the current question
 * @param addResponse: a function that records user's selection to redux
 * @param response: recorded response for this question, initially undefined
 * @return {*}
 * @constructor
 */

const Options = ({options, step, addResponse, response}) => {
    return (
        <Radio.Group className="radio-group" value={response} onChange={(e) => addResponse(step, e.target.value)}>
            {
                Object.entries(options).map(([key, value]) => {
                    return (
                        <Row key={key}>
                            <Radio value={key}>{key}: {value}</Radio>
                        </Row>
                    )
                })
            }
        </Radio.Group>
    )
}

Options.propTypes = {
    options: PropTypes.object,
    step: PropTypes.number,
    addResponse: PropTypes.func
}
export default Options