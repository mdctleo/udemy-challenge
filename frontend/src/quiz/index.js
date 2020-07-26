import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from 'antd'

const { Title } = Typography

const Quiz = ({title}) => {
    return (
        <Title>Quiz 1</Title>
    )
}

Quiz.propTypes = {
    title: PropTypes.string
}

export default Quiz