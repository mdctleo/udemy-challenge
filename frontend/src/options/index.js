import React from 'react'
import PropTypes from 'prop-types'
import {Radio, Row} from "antd";
import "../App.css"

const Options = ({options}) => {
    return (
        <Radio.Group className="radio-group">
            {/*{*/}
            {/*Object.entries(options).map((key, value) => {*/}
            {/*return <Radio value={key}>{key}: {value}</Radio>*/}
            {/*})*/}
            {/*}*/}
            <Row>
                <Radio value="a">item 1</Radio>
            </Row>
            <Row>
                <Radio value="b">item 2</Radio>
            </Row>
            <Row>
                <Radio value="c">item 3</Radio>
            </Row>
        </Radio.Group>
    )
}

Options.propTypes = {
    options: PropTypes.object
}
export default Options