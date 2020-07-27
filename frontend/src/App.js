import React, {useEffect} from 'react';
import PropTypes from 'prop-types'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';

import Controls from './controls'
import {getQuiz, setError} from './action'
import {connect} from "react-redux";
import QuestionContainer from "./question-container";
import {selectError, selectIsLoading, selectResult, selectTitle} from "./selector";
import {Alert, Result, Spin, Typography} from 'antd'

const {Title} = Typography
/***
 *
 * @param title: title of the quiz
 * @param error: indicates if application encountered an error {isError: bool, msg: str}
 * @param isLoading: indicates if application is loading
 * @param result: numeric result of the quiz, initially -1 before completion
 * @param getQuiz: a function that fetches a quiz from the backend
 * @param setError: sets error status of the application
 * @return {*}
 * @constructor
 */

const App = ({title, error, isLoading, result, getQuiz, setError}) => {
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
                {result === -1 ?
                    <div>
                        <QuestionContainer/>
                        <Controls/>
                    </div>
                    :
                    <div>
                        <Result
                            status="success"
                            title={"Your score is: " + result}
                            subTitle="You've completed the quiz!"
                        />
                    </div>
                }
            </Spin>
        </div>
    );
}

App.propTypes = {
    title: PropTypes.string,
    error: PropTypes.object,
    isLoading: PropTypes.bool,
    result: PropTypes.number,
    getQuiz: PropTypes.func,
    setError: PropTypes.func
}

const mapStateToProps = state => {
    return {
        title: selectTitle(state),
        error: selectError(state),
        isLoading: selectIsLoading(state),
        result: selectResult(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getQuiz: _id => dispatch(getQuiz(_id)),
        setError: (isError, msg) => dispatch(setError(isError, msg))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
