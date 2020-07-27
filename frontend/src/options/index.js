import React from 'react'
import PropTypes from 'prop-types'
import {Radio, Row} from "antd";
import "../App.css"

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