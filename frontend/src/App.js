import React, { useEffect } from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';
import Quiz from './quiz'

import Controls from './controls'
import {getQuiz} from './action'
import {connect} from "react-redux";
import QuestionContainer from "./question-container";
import {selectTitle} from "./selector";

const App = ({title, getQuiz}) => {
    useEffect(() => {
        getQuiz(1)
    }, [])
    return (
        <div className="App">
            <Quiz/>
            <QuestionContainer/>
            <Controls />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        title: selectTitle(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getQuiz: _id => dispatch(getQuiz(_id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
