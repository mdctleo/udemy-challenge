import React from 'react'
import PropTypes from 'prop-types'
import {Button, Col, Row} from "antd";
import '../App.css';


const Controls = () => {
    return (
        <Row className="controls">
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Button>Previous</Button>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Button type="primary">Submit</Button>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Button>Next</Button>
            </Col>
        </Row>
    )
}

export default Controls