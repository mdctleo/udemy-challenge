import React, {useEffect} from 'react';
import PropTypes from 'prop-types'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';

import Controls from './controls'
import {getQuiz, setError} from './action'
import {connect} from "react-redux";
import QuestionContainer from "./question-container";
import {selectError, selectIsLoading, selectTitle} from "./selector";
import {Alert, Spin, Typography} from 'antd'

const {Title} = Typography

const App = ({title, error, isLoading, getQuiz, setError}) => {
    useEffect(() => {
        getQuiz(1)
    }, [getQuiz])
    return (
        <div className="App">
            <Title>{title}</Title>
            {error.isError && <Alert
                message="Error"
                description={error.msg}
                type="error"
                closable
                onClose={() => setError(false, "")}
            />}
            <Spin size='large' spinning={isLoading}>
                <QuestionContainer/>
                <Controls/>
            </Spin>
        </div>
    );
}

App.propTypes = {
    title: PropTypes.string,
    error: PropTypes.object,
    isLoading: PropTypes.bool,
    getQuiz: PropTypes.func,
    setError: PropTypes.func
}

const mapStateToProps = state => {
    return {
        title: selectTitle(state),
        error: selectError(state),
        isLoading: selectIsLoading(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getQuiz: _id => dispatch(getQuiz(_id)),
        setError: (isError, msg) => dispatch(setError(isError, msg))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
